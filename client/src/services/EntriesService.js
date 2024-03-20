import { AppState } from "../AppState.js"
import { Entry } from "../models/Entry.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { notebooksService } from "./NotebooksService.js"

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
    if (notebookId != undefined) {
      const foundNotebook = await notebooksService.getNotebookById(notebookId)
      if (foundNotebook != undefined){
        entryData.notebookId = notebookId
      }
    }
    const response = await api.post('api/entries', entryData)
    logger.log('📡 Created Entry Data', response.data)
    const newEntry = new Entry(response.data)
    if (entryData.notebookId !=  undefined) {
      AppState.entries.push(newEntry)
    }
    logger.log(AppState.entries)
    return newEntry
  }
  async deleteEntry(entryId){
    const response = await api.delete(`api/entries/${entryId}`)
    const entryIndex = AppState.entries.findIndex(entry => entry.id == entryId)
    if ( entryId == -1) {
      throw new Error('findIndex in entries to delete, could not find entry to delete. entryId is -1')
    }
    AppState.entries.splice(entryIndex, 1)
    return (` Entry ${response.description}... was deleted`)
  }
}
export const entriesService = new EntriesService()