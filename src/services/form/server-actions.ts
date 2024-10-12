import { ENDPOINTS } from "@/config/end-points"
import { FormModel } from "@/models/form"
import httpServer from "@/services/http-server"

export class FormServiceServer {
  static listing = async ():Promise<{ data: FormModel[] }> => {
    return await httpServer.get(ENDPOINTS.Form.listing).then(r => r.data)
  }

  static show = async (id: string):Promise<{ data: FormModel }> => {
    return await httpServer.get(ENDPOINTS.Form.show(id)).then(r => r.data)
  }
}

