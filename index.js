
const { app, BrowserWindow, net, desktopCapturer, systemPreferences } = require('electron');

let windows = {};
global.BrowserWindow = BrowserWindow; // to get from render
global.windows = windows;
global.systemPreferences=systemPreferences;
app.on('window-all-closed', () => {
  if(process.platform != 'darwin') app.quit();
});

app.on('ready', () => {
  let opts = {
    width: 1024,
    height: 720,
    minWidth: 640,
    minHeight: 480,
    show: true,
    backgroundColor:'#f5f5f5'
  }


  let win = new BrowserWindow(opts);
  win.webContents.openDevTools();
  win.setMenu(null); // удаление меню
  win.loadFile('renderer/index.html');
  win.on('ready-to-show', win.show);
  win.on('closed', () => win = null);

  global.windows.main = win;
/*
  let child = new BrowserWindow({
      parent: win,
      show: false,
      frame:true
    });
    child.setMenu(null); // удаление меню
    child.loadFile('renderer/calls.html');
    child.on('ready-to-show', child.show);
    child.on('closed', () => child = null);
    child.webContents.openDevTools();
    global.windows.calls = child;*/

});
