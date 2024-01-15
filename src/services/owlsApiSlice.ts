import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const owlsApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_OWLS_API_URL,
    }),
    endpoints: (builder) => ({
        getActivePairs: builder.query({
            query: () => `/pairs/active`,
        }),
    }),
})

export const {
    useGetActivePairsQuery,
} = owlsApi
