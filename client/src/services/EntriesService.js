import { AppState } from "../AppState.js"
import { Entry } from "../models/Entry.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EntriesService {
  async getEntriesByNotebookId(notebookId) {
    AppState.entries = null
    const response = await api.get(`api/notebooks/${notebookId}/entries`)
    logger.log('📡 getting entries for this notebook', response.data)
    const newEntries = response.data.map(pojo => new Entry(pojo))
    AppState.entries = newEntries
    logger.log('entries in App State', AppState.entries)
  }
  async createEntry(notebookId, entryData) {
    const response = await api.post('api/entries')
    logger.log('📡 Created Entry Data', response.data)
    const newEntry = new Entry(response.data)
    if (entryData.notebookId !=  undefined) {
      AppState.entries.push(newEntry)
    }
    return newEntry
  }
}
export const entriesService = new EntriesService()