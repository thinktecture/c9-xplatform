'use strict';

let electron = require('electron');
let BrowserWindow = electron.BrowserWindow
let app = electron.app;
let globalShortcut = electron.globalShortcut;

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('will-quit', function() {
    globalShortcut.unregisterAll();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    globalShortcut.register('CmdOrCtrl+Shift+d', function() {
        mainWindow.webContents.toggleDevTools();
    })

    mainWindow.loadURL('file://' + __dirname + '/index.html');


    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
