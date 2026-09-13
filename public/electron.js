const { app, BrowserWindow } = require('electron');

// Specify where our data that we want to fetch is from (In this case React)
const url = require('url');
const path = require('path');

function createMainWindow() {
    // Main window
    const mainWindow = new BrowserWindow ({
        title: 'Working Time!',
        width: 400,
        height: 430,
    });

    const startURL = url.format ({
        // Specify in the directory, connect to react app
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file',
        slashes: true,
    });

    mainWindow.loadURL(startURL); // Load app into electron window
}

app.whenReady().then(createMainWindow);