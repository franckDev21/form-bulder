import { ENDPOINTS } from "@/config/end-points";
import httpServer from "./http-server";
import { getServerCookie } from "@/helpers/cookie-helper-server";

export async function checkAuth(){
    const token = getServerCookie('access_token')
    if (!token) {
        throw new Error('No token found');
    }

    return httpServer.get(ENDPOINTS.Auth.checkAuth).then(r => r.data);
}
