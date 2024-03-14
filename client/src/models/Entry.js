import { Account } from "./Account.js"
import { Notebook } from "./Notebook.js"

export class Entry {
  constructor(data) {
    this.id = data.id || data._id
    this.creatorId = data.creatorId
    this.notebookId = data.notebookId == undefined ? this.notebookId || "" : data.notebookId 
    this.description = data.description == undefined ? this.description || "" : data.description 
    this.img = data.img == undefined ? this.img || "" : data.img 
    this.createdAt = new Date(data.createdAt) || new Date()
    this.updatedAt = new Date(data.updatedAt) || new Date()
    this.creator = data.creator ? new Account(data.creator) : null
    this.notebook = data.notebook ? new Notebook(data.notebook) : null 
  }
}