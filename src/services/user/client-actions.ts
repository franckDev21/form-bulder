import { ENDPOINTS } from "@/config/end-points"
import { UserModel } from "@/models/user"
import httpClient from "@/services/http-client"

export class UserServiceClient {
  static listing = async ():Promise<{ data: UserModel[] }> => {
    return await httpClient.get(ENDPOINTS.User.listing).then(r => r.data)
  }
}

