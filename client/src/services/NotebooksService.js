import { AppState } from "../AppState.js"
import { Notebook } from "../models/Notebook.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class NotebooksService {
 
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
    logger.log('📡 recieved notebook response', response.data)
    AppState.activeNotebook = new Notebook(response.data)
  }
}

export const notebooksService = new NotebooksService()