const electron = require('electron');
// Module that controls the application life
const app = electron.app;
// Module that creates the native browser window
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keeping a global reference of the window object, unless the window will close 
// automatically when the JS object is transferred for garbage collection
let mainWindow;

function createWindow() {
// Creating the browser window
mainWindow = new BrowserWindow({width: 1200, height: 700});

// After creating the browser window the index.html that in within the app will be executed
const startUrl = process.env.ELECTRON_START_URL || url.format({
pathname: path.join(__dirname, '/../www/index.html'),
protocol: 'file:',
slashes: true
});
mainWindow.loadURL(startUrl);

// Opening the developer tools
mainWindow.webContents.openDevTools();

// Executed when the window is closed.
mainWindow.on('closed', function () {

mainWindow = null
})
}

app.on('ready', createWindow);

// Quit when all the window is closed
app.on('window-all-closed', function () {

if (process.platform !== 'darwin') {
app.quit()
}
});

app.on('activate', function () {

if (mainWindow === null) {
createWindow()
}
});
