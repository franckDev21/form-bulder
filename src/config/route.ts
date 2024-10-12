
export const ROUTES = {
    Home: '/',

    Dashboard: {
        home: '/dashboard',
        Form: {
            home: '/dashboard/forms',
            create: '/dashboard/forms/create',
        }
    },

    Profile : {
        home: 'espace-client'
    },

    Checkout: '/checkout',
} as const