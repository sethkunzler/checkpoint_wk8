import { AppState } from "../AppState.js"
import { Notebook } from "../models/Notebook.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class NotebooksService {
  async createNotebook(notebookData) {
    const response = await api.post('api/notebooks', notebookData)
    logger.log('📡 Created Notebook', response.data)
    const newNotebook = new Notebook(response.data)
    AppState.notebooks.push(newNotebook)
    return newNotebook
  }
  async getMyNotebooks() {
    const response = await api.get('api/notebooks')
    // logger.log('api response "my notebooks":', response.data)
    const newNotebooks = response.data.map(pojo => new Notebook(pojo))
    AppState.notebooks = newNotebooks
  }
  async getNotebookById(notebookId) {
    AppState.activeNotebook = null
    logger.log(`getting Notebook by ID: ${notebookId}`)
    const response = await api.get(`api/notebooks/${notebookId}`)
    logger.log('📡 received notebook response', response.data)
    AppState.activeNotebook = new Notebook(response.data)
  }
  async editNotebookData(notebookData, notebookId) {
    const response = await api.put(`api/notebooks/${notebookId}`, notebookData)
    const notebookIndex = AppState.notebooks.findIndex(notebook => notebook.id == notebookId)
    if( notebookIndex == -1 ) {
      throw new Error('find notebookIndex to update could not be found')
    }
    const newNotebook = new Notebook(response.data)
    AppState.notebooks.splice(notebookIndex, 1, newNotebook)
    AppState.activeNotebook = newNotebook

    // TODO splice the notebook from the array and replace it with its update
  }
  async deleteNotebook(notebookId) {
    await api.delete(`api/notebooks/${notebookId}`)
    const notebookIndex = AppState.notebooks.findIndex(notebook => notebook.id == notebookId)
    if( notebookIndex == -1 ) {
      throw new Error('find notebookIndex to be deleted is messed up dude!')
    }
    AppState.notebooks.splice(notebookIndex, 1)
    return (`Notebook was deleted`)
  }
}
export const notebooksService = new NotebooksService()