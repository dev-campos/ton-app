import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Item {
    id: number;
    name: string;
    // Define other properties as needed
}

export const tonApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => 'items',
        }),
        // Add more endpoints as needed
    }),
});

export const { useGetItemsQuery } = tonApiSlice;
