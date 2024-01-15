import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tonApi = createApi({
    reducerPath: 'tonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_TON_API_URL,
    }),
    endpoints: (builder) => ({
        // accounts
        getAddressInformation: builder.query({
            query: ({ address }) => `getAddressInformation?address=${address}`,
        }),
        getAddressBalance: builder.query({
            query: ({ address }) => `getAddressBalance?address=${address}`,
        }),
    }),
})

export const {
    useGetAddressInformationQuery,
    useGetAddressBalanceQuery
} = tonApi