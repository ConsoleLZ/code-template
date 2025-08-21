import { app, BrowserWindow, ipcMain } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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

function createWindow() {
	win = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
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
		win?.webContents.send('main-process-message', new Date().toLocaleString());
	});

	ipcMain.handle('child-process-message', (_e, appName: string) => {
		console.log(appName);
	});

	// 最小化窗口
	ipcMain.handle('minimize-window', () => {
		win.minimize();
	});

	ipcMain.handle('maximize-window', () => {
		if (win.isMaximized()) {
			win.unmaximize(); // 如果已最大化，则恢复
		} else {
			win.maximize(); // 最大化
		}
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

app.whenReady().then(createWindow);

process.on('uncaughtException', error => {
	console.log(error);
	win.webContents.send('message', {
		value: '发生未知错误',
		success: false
	});
});
