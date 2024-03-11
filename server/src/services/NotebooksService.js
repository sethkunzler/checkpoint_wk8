import { dbContext } from "../db/DbContext.js"

class NotebooksService {
  async createNotebook(notebookData) {
    const notebook = await dbContext.Notebooks.create(notebookData)
    await notebook.populate('creator')
    return notebook
  }
  async getNotebooks(creatorId) {
    const notebooks = await dbContext.Notebooks.find({creatorId}).populate('creator')
    return notebooks 
  }
  async getNotebookById(notebookId) {
    const notebook = await dbContext.Notebooks.findById(notebookId).populate('creator', '-email')
    return notebook
  }
}
export const notebooksService = new NotebooksService