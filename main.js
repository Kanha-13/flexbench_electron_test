
const { Worker } = require('worker_threads')
const { app, BrowserWindow, ipcMain, Menu } = require('electron');

//create window
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadFile('index.html')
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

//catch btn click
ipcMain.on('run:simple-request', (e, item) => {
  // console.log("btn clicked")
  //Create new worker
  const worker = new Worker("./httpStimulator/example/simple-request", {});
  //Listen for a message from worker
  worker.once("message", stats => {
    mainWindow.webContents.send('result', stats);
  });
})

const mainMenuTemplate = [
  {
    role: 'reload'
  }
]




