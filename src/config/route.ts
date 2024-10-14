
export const ROUTES = {
    Home: '/',

    Dashboard: {
        home: '/dashboard',
        Form: {
            home: '/dashboard/forms',
            create: '/dashboard/forms/create',
            edit: (formId: string) =>  `/dashboard/forms/edit/${formId}`,
            preview: (formId: string) =>  `/dashboard/forms/preview/${formId}`,
        }
    },

    Profile : {
        home: 'espace-client'
    },

    Checkout: '/checkout',
} as const