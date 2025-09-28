import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import { DatabaseManager } from './database/DatabaseManager';
import { AIService } from './services/AIService';

class LittleGeniusApp {
  private mainWindow: BrowserWindow | null = null;
  private databaseManager: DatabaseManager;
  private aiService: AIService;

  constructor() {
    this.databaseManager = new DatabaseManager();
    this.aiService = new AIService();
    this.initializeApp();
  }

  private initializeApp(): void {
    app.whenReady().then(() => {
      this.createWindow();
      this.setupIPC();
      this.createMenu();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }

  private createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      icon: path.join(__dirname, '../assets/icon.png'),
      titleBarStyle: 'hiddenInset',
      show: false,
    });

    // Load the app
    const forceProd = process.env.FORCE_PROD === 'true';
    const startUrl = (!forceProd && isDev)
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`;
    
    this.mainWindow.loadURL(startUrl);

    // Show window when ready
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
      
      if (isDev && !forceProd) {
        this.mainWindow?.webContents.openDevTools();
      }
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }

  private setupIPC(): void {
    // User management
    ipcMain.handle('create-user-profile', async (event, profileData) => {
      return await this.databaseManager.createUserProfile(profileData);
    });

    ipcMain.handle('get-user-profiles', async () => {
      return await this.databaseManager.getUserProfiles();
    });

    ipcMain.handle('update-user-progress', async (event, userId, progressData) => {
      return await this.databaseManager.updateUserProgress(userId, progressData);
    });

    // AI interactions
    ipcMain.handle('ai-chat', async (event, message, userContext) => {
      return await this.aiService.chat(message, userContext);
    });

    ipcMain.handle('ai-generate-activity', async (event, ageGroup, subject) => {
      return await this.aiService.generateActivity(ageGroup, subject);
    });

    // Educational content
    ipcMain.handle('get-activities', async (event, ageGroup, subject) => {
      return await this.databaseManager.getActivities(ageGroup, subject);
    });

    ipcMain.handle('save-activity-result', async (event, activityResult) => {
      return await this.databaseManager.saveActivityResult(activityResult);
    });
  }

  private createMenu(): void {
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'LittleGenius AI',
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
}

// Initialize the application
new LittleGeniusApp();