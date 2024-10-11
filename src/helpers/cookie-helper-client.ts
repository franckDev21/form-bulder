import { setCookie, parseCookies, destroyCookie } from 'nookies';

// Pour un composant client
export function setClientCookie(name: string, value: string, options: { path?: string, maxAge?: number } = {}) {
    setCookie(null, name, value, {
        path: '/',
        ...options,
    });
}

// Pour un composant client
export function getClientCookie(name: string): string | undefined {
    const cookies = parseCookies();
    return cookies[name];
}

// Pour un composant client
export function deleteClientCookie(name: string) {
    destroyCookie(null, name, {
        path: '/',
    });
}
