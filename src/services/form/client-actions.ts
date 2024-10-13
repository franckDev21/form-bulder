import { ENDPOINTS } from "@/config/end-points"
import { FormModel } from "@/models/form"
import httpClient from "@/services/http-client"
import { PostRequestFormData } from "@/types/form"

export class FormServiceClient {
  static store = async (data: PostRequestFormData):Promise<{ data: FormModel }> => {
    return await httpClient.post(ENDPOINTS.Form.create, data).then(r => r.data)
  }

  static update = async (formId: string, data: PostRequestFormData):Promise<{ data: FormModel }> => {
    return await httpClient.patch(ENDPOINTS.Form.update(formId), data).then(r => r.data)
  }

  static delete = async (formId: string):Promise<{ data: FormModel }> => {
    return await httpClient.delete(ENDPOINTS.Form.delete(`${formId}`)).then(r => r.data)
  }
}
