import { app, BrowserWindow, ipcMain } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getPlatform } from './utils';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow | null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	// 获取失败：说明已经有实例在运行，直接退出当前实例
	app.quit();
} else {
	// 获取成功：监听是否有第二个实例启动
	app.on('second-instance', (event, commandLine, workingDirectory) => {
		// 当第二个实例运行时，这个回调会被触发
		// 这时应该激活主窗口（比如从最小化恢复、置顶等）
		if (win) {
			if (win.isMinimized()) win.restore();
			win.focus();
		}
	});

	// 正常创建窗口
	app.whenReady().then(() => {
		createWindow();

		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) createWindow();
		});
	});
}

function createWindow() {
	win = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC, 'icon.ico'),
		titleBarStyle: 'hidden',
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs')
		},
		show: false
	});

	if (!isDev) {
		win.setMenu(null);
	}

	// Test active push message to Renderer-process.
	win.webContents.on('did-finish-load', () => {
		win.show();
		win.webContents.send('hasMaximize', win.isMaximized());
		win.webContents.send('platform', getPlatform());
	});

	ipcMain.handle('child-process-message', (_e, appName: string) => {
		console.log(appName);
	});

	// 最小化窗口
	ipcMain.handle('minimize-window', () => {
		win.minimize();
	});

	ipcMain.handle('maximize-window', () => {
		let hasMaximize = null;
		if (win.isMaximized()) {
			win.unmaximize(); // 如果已最大化，则恢复
			hasMaximize = false;
		} else {
			win.maximize(); // 最大化
			hasMaximize = true;
		}

		win.webContents.send('hasMaximize', hasMaximize);
	});

	ipcMain.handle('close-window', () => {
		win.close(); // 关闭窗口
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		win.loadFile(path.join(RENDERER_DIST, 'index.html'));
	}
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
		win = null;
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// app.whenReady().then(createWindow);

process.on('uncaughtException', error => {
	console.log(error);
	win.webContents.send('message', {
		value: '发生未知错误',
		success: false
	});
});
