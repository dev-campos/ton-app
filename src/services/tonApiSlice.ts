import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Address, TonClient } from "@ton/ton";
import { fromNano } from "@ton/core";

const tonClientBaseQuery: BaseQueryFn<{ method: string, address: string }, unknown, unknown> = async ({ method, address }) => {
    try {
        const endpoint = await getHttpEndpoint({ network: "testnet" });
        const client = new TonClient({ endpoint });

        switch (method) {
            case 'getAddressBalance': {
                const parsedAddress = Address.parse(address);
                const balance = await client.getBalance(parsedAddress);

                return { data: fromNano(balance) };
            }
            default:
                return { error: { status: 'CUSTOM_ERROR', error: 'Method not supported' } };
        }
    } catch (error) {
        return { error: { status: 'FETCH_ERROR', error: error instanceof Error ? error.message : 'An unknown error occurred' } };
    }
};

export const tonApi = createApi({
    reducerPath: 'tonApi',
    baseQuery: tonClientBaseQuery,
    endpoints: (builder) => ({
        getAddressBalance: builder.query({
            query: (address) => ({ method: 'getAddressBalance', address }),
        }),
    }),
});

export const {
    useGetAddressBalanceQuery
} = tonApi;
