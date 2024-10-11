import { cookies } from 'next/headers';

// Pour un composant serveur
export function setServerCookie(name: string, value: string, options: { path?: string, maxAge?: number } = {}) {
    const cookieStore = cookies();
    cookieStore.set({
        name: name,
        value: value,
        ...options,
    });
}

// Pour un composant serveur
export function getServerCookie(name: string): string | undefined {
    const cookieStore = cookies();
    const cookieValue = cookieStore.get(name)?.value;
    return cookieValue;
}
