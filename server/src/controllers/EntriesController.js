import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { entriesService } from "../services/EntriesService.js"

export class EntriesController extends BaseController {
  constructor() {
    super('api/entries')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)// middleware
      .post('', this.createEntry)
  }
  async createEntry(request, response, next) {
    try {
      const entryData = request.body
      entryData.creatorId = request.userInfo.id
      const entry = await entriesService.createEntry(entryData)
      response.send(entry)
    } catch (error) {
      next(error)
    }
  }
}