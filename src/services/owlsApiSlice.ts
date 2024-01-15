import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const owlsApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_OWLS_API_URL,
    }),
    endpoints: (builder) => ({
        // pairs
        getActivePairs: builder.query({
            query: () => `/pairs/active`,
        }),
        // assets
        getLatestPrice: builder.query({
            query: ({ baseAsset, quoteAsset }) => `assetPrice/latest?BaseAsset=${baseAsset}&QuoteAsset=${quoteAsset}`,
        }),
    }),
})

export const {
    useGetActivePairsQuery,
    useGetLatestPriceQuery
} = owlsApi