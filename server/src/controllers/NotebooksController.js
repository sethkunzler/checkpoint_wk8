import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notebooksService } from "../services/NotebooksService.js";

export class NotebooksController extends BaseController {
  constructor() {
    super('api/notebooks')
    this.router
      .get('/:notebookId', this.getNotebooksById)
      .use(Auth0Provider.getAuthorizedUserInfo) //middleware
      .get('', this.getNotebooks)
      .post('', this.createNotebook)
      .put('/:notebookId', this.updateNotebook)
      .delete('/:notebookId', this.deleteNotebook)
    }

  async createNotebook(request, response, next) {
    try {
      const notebookData = request.body
      notebookData.creatorId = request.userInfo.id
      const notebook = await notebooksService.createNotebook(notebookData)
      response.send(notebook)
    } catch (error) {
      next(error)
    }
  }
  async getNotebooks(request, response, next) {
    try {
      const accountId = request.userInfo.id
      const notebooks = await notebooksService.getNotebooks(accountId)
      response.send(notebooks)
    } catch (error) {
      next(error)
    }
  }
  
  async getNotebooksById(request, response, next) {
    try {
      const notebookId = request.params.notebookId
      const notebook = await notebooksService.getNotebookById(notebookId)
      response.send(notebook)
    } catch (error) {
      next(error)
    }
  }

  async updateNotebook(request, response, next) {
    try {
      const notebookId =  request.params.notebookId
      const newData = request.body
      const userId = request.userInfo.id 
      const message = await notebooksService.updateNotebook(notebookId, newData, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async deleteNotebook(request, response, next) {
    try {
      const notebookId = request.params.notebookId
      const userId = request.userInfo.id
      await notebooksService.deleteNotebook(notebookId, userId)
      response.send("Notebook successfully deleted")
    } catch (error) {
      next(error)
    }
  }
}
