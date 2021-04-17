// Modules to control application life and create native browser window
const electron = require('electron')
const path = require('path')
const {app, BrowserWindow, Menu} = electron

process.env.NODE_ENV = 'development';

function createMainWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Quit app when closed
  mainWindow.on('closed', function() {
    app.quit()
  })
}

function createAboutWindow() {
  // Create the browser window.
  const aboutWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'About'
  })

  // and load the index.html of the app.
  aboutWindow.loadFile('about.html')

  aboutWindow.on('closed', function() {
    aboutWindow = null
  })
}

// Create menu template
var mainMenuTemplate = [
  {
    label: 'Options',
    submenu: [
      {
        label: 'About',
        click(){
          createAboutWindow()
        }
      },
      {
        label: 'Donate'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit()
        }
      }
    ]
  }
]

if(process.platform == 'darwin') {
  mainMenuTemplate.splice(0, 0, {label: 'App name'})
}

if(process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }, 
      {
        role: 'reload'
      }
    ]
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createMainWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })

  // build menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
})