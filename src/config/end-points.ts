export const ENDPOINTS = {
    Auth: {
        login: 'login',
        logout: 'logout',
        checkAuth: 'check-auth',
        userInfo: 'user-info',
    },

    Form: {
        listing: 'form',
        create: 'form',
        update: (id: string) => `form/${id}`,
        show: (id: string) => `form/${id}`,
        delete: (id: string) => `form/${id}`,
    },

    User: {
        listing: 'user',
    }

} as const