const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('tbActions', {
    sendExit: () => ipcRenderer.send('close'),
    sendMinimize: () => ipcRenderer.send('minimize'),
    sendMaximize: () => ipcRenderer.send('maximize'),
});

// contextBridge.exposeInMainWorld('Note', {
//     newNote: async (noteName) => ipcRenderer.invoke('new-note', noteName),
//     newText: async (type, noteName) => ipcRenderer.send('new-text', type, noteName),
//     updateText: async (noteName, textId, textContent) => ipcRenderer.send('update-text', noteName, textId, textContent),
//     deleteText: async (noteName, textId) => ipcRenderer.send('delete-text', noteName, textId)
// })
