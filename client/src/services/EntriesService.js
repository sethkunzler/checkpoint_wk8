import { AppState } from "../AppState.js"
import { Entry } from "../models/Entry.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EntriesService {
  async createEntry(entryData) {
    const response = await api.post('api/entries', entryData)
    logger.log('📡 Created Entry Data', response.data)
    const newEntry = new Entry(response.data)
    if (entryData.notebookId !=  undefined) {
      AppState.entries.push(newEntry)
    }
    logger.log(AppState.entries)
    return newEntry
  }
  async getMyEntries() {
    AppState.entries = []
    const response = await api.get('api/entries')
    const newEntries = response.data.map(pojo => new Entry(pojo))
    AppState.entries = newEntries
  }

  async getEntriesByNotebookId(notebookId) {
    AppState.entries = []
    const response = await api.get(`api/notebooks/${notebookId}/entries`)
    logger.log('📡 getting entries for this notebook', response.data)
    const newEntries = response.data.map(pojo => new Entry(pojo))
    AppState.entries = newEntries
    logger.log('entries in App State', AppState.entries)
  }
  async deleteEntry(entryId){
    const response = await api.delete(`api/entries/${entryId}`)
    const entryIndex = AppState.entries.findIndex(entry => entry.id == entryId)
    if ( entryId == -1) {
      throw new Error('findIndex in entries to delete, could not find entry to delete. entryId is -1')
    }
    AppState.entries.splice(entryIndex, 1)
    return (`Entry was deleted`)
  }
}
export const entriesService = new EntriesService()