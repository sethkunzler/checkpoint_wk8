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
}

export const notebooksService = new NotebooksService()