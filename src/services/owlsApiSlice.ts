import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const owlsApi = createApi({
    reducerPath: 'owlsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    endpoints: (builder) => ({
        // AssetPairs Endpoints
        getActiveAssetPairs: builder.query({
            query: () => '/AssetPairs/active',
        }),

        // AssetPrice Endpoints
        getActiveAssetPrice: builder.query({
            query: ({ BaseAsset, QuoteAsset }) => `/AssetPrice/active?BaseAsset=${BaseAsset}&QuoteAsset=${QuoteAsset}`,
        }),
        getLatestAssetPrice: builder.query({
            query: ({ BaseAsset, QuoteAsset }) => `/AssetPrice/latest?BaseAsset=${BaseAsset}&QuoteAsset=${QuoteAsset}`,
        }),

        // Currency Endpoints
        getCurrencyById: builder.query({
            query: (currencyId) => `/Currency/${currencyId}`,
        }),
        queryCurrencies: builder.query({
            query: ({ PageSize, PageNumber }) => `/Currency/query?PageSize=${PageSize}&PageNumber=${PageNumber}`,
        }),

        // Network Endpoints
        getActiveNetwork: builder.query({
            query: () => '/Network/active',
        }),

        // Option Endpoints
        getOptionById: builder.query({
            query: (optionId) => `/Option/${optionId}`,
        }),
        queryOptions: builder.query({
            query: ({ Address, Status, OptionLedgerId }) => `/Option/query?Address=${Address}&Status=${Status}&OptionLedgerId=${OptionLedgerId}`,
        }),
        getOptionTradeHistory: builder.query({
            query: ({ Address, PageSize, PageNumber, InActive, FromDate, ToDate }) => `/Option/trade/history?Address=${Address}&PageSize=${PageSize}&PageNumber=${PageNumber}&InActive=${InActive}&FromDate=${FromDate}&ToDate=${ToDate}`,
        }),
        getActiveOptionTrades: builder.query({
            query: ({ Address, PageSize, PageNumber, FromDate, ToDate }) => `/Option/trade/active?Address=${Address}&PageSize=${PageSize}&PageNumber=${PageNumber}&FromDate=${FromDate}&ToDate=${ToDate}`,
        }),
        createOption: builder.mutation({
            query: (body) => ({
                url: `/Option/create`,
                method: 'POST',
                body,
            }),
        }),
        getPotentialPayout: builder.query({
            query: ({ Amount, OptionLedgerId }) => `/Option/potentialPayout?Amount=${Amount}&OptionLedgerId=${OptionLedgerId}`,
        }),

        // OptionLedger Endpoints
        getOptionLedgerById: builder.query({
            query: (id) => `/OptionLedger/${id}`,
        }),
        getActiveOptionLedgers: builder.query({
            query: () => '/OptionLedger/active',
        }),
        getLiveOptionLedgers: builder.query({
            query: () => '/OptionLedger/live',
        }),
    }),
});

// Export hooks for components
export const {
    useGetActiveAssetPairsQuery,
    useGetActiveAssetPriceQuery,
    useGetLatestAssetPriceQuery,
    useGetCurrencyByIdQuery,
    useQueryCurrenciesQuery,
    useGetActiveNetworkQuery,
    useGetOptionByIdQuery,
    useQueryOptionsQuery,
    useGetOptionTradeHistoryQuery,
    useGetActiveOptionTradesQuery,
    useCreateOptionMutation,
    useGetPotentialPayoutQuery,
    useGetOptionLedgerByIdQuery,
    useGetActiveOptionLedgersQuery,
    useGetLiveOptionLedgersQuery,
} = owlsApi;
