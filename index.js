const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const PAGINATION_STEP = 12;
const MOVIES_PATH = path.join(__dirname, 'public', 'movies');

let mainWindow;
let categories;

function createWindow() {
  // Создаем окно браузера.
  mainWindow = new BrowserWindow({
    /*skipTaskbar: true*/
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // mainWindow.setFullScreen(true);

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // const startUrl =
  //   process.env.ELECTRON_START_URL || `file://${__dirname}/build/index.html`;
  // mainWindow.loadURL(startUrl);

  // Отображаем средства разработчика.
  mainWindow.webContents.openDevTools();

  // enable garbage collector
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.allowRendererProcessReuse = true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Некоторые API могут использоваться только после возникновения этого события.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // Для приложений и строки меню в macOS является обычным делом оставаться
  // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // На MacOS обычно пересоздают окно в приложении,
  // после того, как на иконку в доке нажали и других открытых окон нету.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. Можно также поместить их в отдельные файлы и применить к ним require.

ipcMain.on('categories:get', () => {
  fs.readdir(MOVIES_PATH, function (err, items) {
    categories = items;
    mainWindow.webContents.send('categories:list', categories);
  });
});

ipcMain.on('movies:get', (event, { categoryId, page }) => {
  const CATEGORY_FOLDER_NAME = categories[categoryId];
  const CATEGORY_FOLDER = `/movies/${CATEGORY_FOLDER_NAME}`;
  const POSTERS_FOLDER = path.join(MOVIES_PATH, CATEGORY_FOLDER_NAME, 'image');

  fs.readdir(POSTERS_FOLDER, function (err, items) {
    const length = items ? items.length : 0;
    const maxPage = Math.ceil(length / PAGINATION_STEP);
    const movies = items
      ? items.slice((page - 1) * PAGINATION_STEP, page * PAGINATION_STEP)
      : null;
    mainWindow.webContents.send('movies:list', {
      movies,
      maxPage,
      CATEGORY_FOLDER,
    });
  });
});
