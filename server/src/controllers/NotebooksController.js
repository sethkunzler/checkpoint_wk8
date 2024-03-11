import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notebooksService } from "../services/NotebooksService.js";

export class NotebooksController extends BaseController {
  constructor() {
    super('api/notebooks')
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo) //middleware
      .get('', this.getNotebooks)
      .post('', this.createNotebook)
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

}
