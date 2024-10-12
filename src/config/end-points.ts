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
        show: (id: string) => `form/${id}`,
    },

    User: {
        listing: 'user',
    }

} as const