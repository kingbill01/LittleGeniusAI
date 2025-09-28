import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // User management
  createUserProfile: (profileData: any) => ipcRenderer.invoke('create-user-profile', profileData),
  getUserProfiles: () => ipcRenderer.invoke('get-user-profiles'),
  updateUserProgress: (userId: string, progressData: any) => ipcRenderer.invoke('update-user-progress', userId, progressData),

  // AI interactions
  aiChat: (message: string, userContext: any) => ipcRenderer.invoke('ai-chat', message, userContext),
  aiGenerateActivity: (ageGroup: string, subject: string) => ipcRenderer.invoke('ai-generate-activity', ageGroup, subject),

  // Educational content
  getActivities: (ageGroup: string, subject: string) => ipcRenderer.invoke('get-activities', ageGroup, subject),
  saveActivityResult: (activityResult: any) => ipcRenderer.invoke('save-activity-result', activityResult),
});