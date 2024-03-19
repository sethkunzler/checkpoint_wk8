import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { notebooksService } from "./NotebooksService.js" // for validation - get notebook by ID

class EntriesService {
  async createEntry(data) {
    // FIXME the validation for the notebook's creator ID matching the user ID does not work
    // const notebook = await notebooksService.getNotebookById(data.notebookId)
    // if (notebook.creatorId != data.creatorId) {
    //   throw new Forbidden("YOU ARE NOT THE CREATOR OF THIS NOTEBOOK! ACCESS TO EDIT IS RESTRICTED TO THE CREATOR ONLY!")
    // }
    const entry = await dbContext.Entries.create(data)
    await entry.populate('notebook')
    await entry.populate('creator')
    return entry
  }
  async getMyEntries(accountId) {
    const entries = await dbContext.Entries.find({creatorId : accountId}).populate('notebook').populate('creator')
    return entries
  }
  async getNotebookEntries(notebookId) {
    const entries = await dbContext.Entries.find({notebookId}).populate('notebook').populate('creator')
    return entries
  }
  async getEntryById(entryId) {
    const entry = await dbContext.Entries.findById(entryId).populate('notebook').populate('creator')
    if (!entry) {
      throw new BadRequest(`Entry Not Found! No _id matches the given Entry ID: ${entryId}`)
    }
    return entry
  }
  async editEntry(entryId, userId, newData) { 
    const entry = await this.getEntryById(entryId)
    if (entry.creatorId != userId) {
      throw new Forbidden("YOU ARE NOT THE CREATOR OF THIS ENTRY! ACCESS TO EDIT IS RESTRICTED TO THE CREATOR ONLY!")
    }
    // TODO the validation for matching the notebook's creator ID to the user ID did not work 
    // needs to check if there is a notebook and then check if the creator Id matches the user ID
    // NOTE Made an edit to this that I want to check, but I am going to check something else first
    // if (newData.notebook){
    //  if (newData.notebook.creatorId != userId) {
    //   throw new Forbidden("YOU ARE NOT THE CREATOR OF THIS NOTEBOOK! ACCESS TO EDIT IS RESTRICTED TO THE CREATOR ONLY!")
    // }
    //}

    // description string
    entry.description = newData.description == undefined ? 
    entry.description 
    : 
    newData.description
    // image url string
    entry.img = newData.img == undefined ? 
    entry.img
    :
    newData.img 
    // Notebook ID 
    entry.notebookId = newData.notebookId == undefined ? 
    entry.notebookId
    :
    newData.notebookId
    // saving the updates before returning it out - Updates will not save if they are not filled out correctly
    await entry.save()
    return entry
  }
  async deleteEntry(entryId, userId) {
    const entry = await this.getEntryById(entryId)
    if (entry.creatorId != userId) {
      throw new Forbidden("YOU ARE NOT THE CREATOR OF THIS ENTRY! ACCESS TO DELETE IS RESTRICTED TO THE CREATOR ONLY!")
    }
    await entry.deleteOne()
  }
}

export const entriesService = new EntriesService 