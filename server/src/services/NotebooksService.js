import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class NotebooksService {
  
  async createNotebook(notebookData) {
    const notebook = await dbContext.Notebooks.create(notebookData)
    await notebook.populate('creator')
    return notebook
  }
  async getNotebooks(creatorId) {
    const notebooks = await dbContext.Notebooks.find({creatorId}).populate('creator').populate('entryCount')
    return notebooks 
  }
  async getNotebookById(notebookId) {
    const notebook = await dbContext.Notebooks.findById(notebookId).populate('creator', '-email').populate('entryCount')
    if(!notebook) {
      throw new BadRequest(`Notebook Not Found! no _id matches the given Notebook ID: ${notebookId}`)
    }
    return notebook
  }
  async updateNotebook(notebookId, newData, userId) {
    const bookToUpdate = await this.getNotebookById(notebookId)
    if (bookToUpdate.creatorId != userId) {
      throw new Forbidden("YOU ARE NOT THE CREATOR OF THIS NOTEBOOK! ACCESS TO EDIT IS RESTRICTED TO THE CREATOR ONLY!")
    }
    bookToUpdate.title = newData.title || bookToUpdate.title
    bookToUpdate.icon = newData.icon || bookToUpdate.icon
    bookToUpdate.color = newData.color || bookToUpdate.color
    bookToUpdate.coverImg = newData.coverImg || bookToUpdate.coverImg
    await bookToUpdate.save()
    return bookToUpdate
  }
  async deleteNotebook(notebookId, userId) {
    const book = await this.getNotebookById(notebookId)
    if (book.creatorId != userId) {
      throw new Forbidden("YOU ARE NOT THE CREATOR OF THIS NOTEBOOK! ACCESS TO DELETE IS RESTRICTED TO THE CREATOR ONLY!")
    }
    await book.deleteOne()
  }
}
export const notebooksService = new NotebooksService