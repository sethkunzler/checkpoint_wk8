import { dbContext } from "../db/DbContext.js"

class EntriesService {

  async createEntry(data) {
    const entry = await dbContext.Entries.create(data)
    await entry.populate('notebook')
    return entry
  }
  async getMyEntries(accountId) {
    const entries = await dbContext.Entries.find({creatorId : accountId}).populate('notebook')
    return entries
  }
}

export const entriesService = new EntriesService 