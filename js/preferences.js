const {remote} = require('electron');
const {app, Menu, BrowserWindow} = remote;

let win = BrowserWindow.getFocusedWindow()

$('body').on('click', '.close', function(e) {
	e.preventDefault();
	win.close();
});