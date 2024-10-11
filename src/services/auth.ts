import httpClient from "./http-client";
import { ENDPOINTS } from "@/config/end-points";
import { deleteClientCookie, setClientCookie } from "@/helpers/cookie-helper-client";
import { CredentialUser, LoginResponseData } from "@/types/auth";
import { UserModel } from "@/models/user";

export async function login(credentials: CredentialUser): Promise<LoginResponseData>{
    const response  = await httpClient.post<LoginResponseData>(ENDPOINTS.Auth.login, credentials).then(r => r.data)
    // save token du user dans les cookies du navigateur
    setClientCookie('access_token', response.access_token, { maxAge: 30 * 24 * 60 * 60 }); // valable 30 jours

    return response
}

export async function logout(): Promise<{ message: string }> {
    const response = await httpClient.post(ENDPOINTS.Auth.logout).then(r => r.data)
    deleteClientCookie('access_token')
    return response
}

export async function userInfo(): Promise<{ data: UserModel }>{
    return httpClient.get(ENDPOINTS.Auth.userInfo).then(r => r.data)
}
