import os from 'os';

export const getPlatform = () => {
	const platform = os.platform();

	switch (platform) {
		case 'win32':
			return 'Windows';
		case 'darwin':
			return 'macOS';
		case 'linux':
			return 'Linux';
		default:
			return 'Unknown';
	}
};