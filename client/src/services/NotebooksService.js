import { AppState } from "../AppState.js"
import { Notebook } from "../models/Notebook.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class NotebooksService {
  async getMyNotebooks() {
    const response = await api.get('api/notebooks')
    logger.log('api response "my notebooks":', response.data)
    const newNotebooks = response.data.map(pojo => new Notebook(pojo))
    AppState.notebooks = newNotebooks
  }

}

export const notebooksService = new NotebooksService()