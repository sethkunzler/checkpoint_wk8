import { dbContext } from "../db/DbContext.js"

class EntriesService {

  async createEntry(data) {
    const entry = await dbContext.Entries.create(data)
    await entry.populate('notebook')
    return entry
  }
}

export const entriesService = new EntriesService 