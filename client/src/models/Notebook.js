import { Account } from "./Account.js"

export class Notebook {
  constructor(data) {
    this.id = data.id || data._id
    this.creatorId = data.creatorId
    this.title = data.title
    this.icon = data.icon
    this.color = data.color || "#000000"
    this.coverImg = data.coverImg
    this.createdAt = new Date(data.createdAt) || new Date() 
    this.updatedAt = new Date(data.updatedAt) || new Date()
    this.creator = data.creator ? new Account(data.creator) : null
    this.entryCount = data.entryCount
  }
}

const creator = {
  id: "",
  subs: "",
  email: "",
  name: "",
  picture: "", 
  createdAt: "",
  updatedAt: "",
}