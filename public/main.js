const { app, BrowserWindow, webContents, ipcMain } = require('electron');
const fs= require('fs');
const path = require('path');

require('@electron/remote/main').enable(webContents);
require('@electron/remote/main').initialize();

function createWindow() {
    // Create the browser window
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minHeight: 600,
        minWidth: 800,
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    ipcMain.on('close', () => {
        win.close();
    });

    ipcMain.on('minimize', () => {
        win.minimize();
    });

    ipcMain.on('maximize', () => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    });

    /*
    Every operation that includes saving a new set of data
    should be accomponied by a forced React re-render on
    the front-end to make sure the data is displayed.
    */

    win.loadURL('http://localhost:3000');

    win.openDevTools();
}

app.on('ready', createWindow);

app.on('browser-window-created', (_, window) => {
    require('@electron/remote/main').enable(window.webContents);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platfrom !== 'darwin') {
        app.quit();
    }
});

app.on('deactivate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
