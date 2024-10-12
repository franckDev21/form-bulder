import { ENDPOINTS } from "@/config/end-points"
import { UserModel } from "@/models/user"
import httpServer from "@/services/http-server"

export class UserServiceServer {
  static listing = async ():Promise<{ data: UserModel[] }> => {
    return await httpServer.get(ENDPOINTS.User.listing).then(r => r.data)
  }
}

