const {app, BrowserWindow} = require('electron');

function createWindow() {
    // Create main window with some default setting.
    const win = new BrowserWindow({
        width: 1350,
        height: 750,
        minWidth: 1350,
        minHeight: 750,
        // icon: "app-icon.png",
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });
    win.loadFile("index.html");
    win.setMenuBarVisibility(false);
}

// Call the "createWindow" function when the app is ready to start.
app.whenReady().then(createWindow);