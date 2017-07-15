const {app, BrowserWindow, Menu} = require('electron'); // Module to control application life.
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let storage = require("./storage");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
function createWindow () {

	var lastWindowState = storage.get("lastWindowState");

	let showFrame = false;
	/*if (process.platform !== 'darwin') {
		showFrame = true;
	}*/

	// lastWindowState = null;
	// storage.set("lastWindowState", null);

	if (lastWindowState === null) {
		lastWindowState = {
			width: 400,
			height: 430,
			frame: showFrame,
			resizable: false
		}
	}

	mainWindow = new BrowserWindow({
		x: lastWindowState.x,
		y: lastWindowState.y,
		width: 400,
		height: 430,
		frame: showFrame,
		resizable: false
	});

	// and load the index.html of the app.
	// mainWindow.loadURL('file://' + __dirname + '/index.html');

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();

	mainWindow.on('close', function() {
		var bounds = mainWindow.getBounds();
		storage.set("lastWindowState", {
			x: bounds.x,
			y: bounds.y,
			width: bounds.width,
			height: bounds.height,
			frame: showFrame,
			resizable: false
		});
	});

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	// require('./menu');
};

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('ready', createWindow);