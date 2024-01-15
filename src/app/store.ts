import { configureStore } from '@reduxjs/toolkit';
import { owlsApi } from '../services/owlsApiSlice';
import { tonApi } from '../services/tonApiSlice';
import pairsReducer from '../features/pairsSlice'


export const store = configureStore({
    reducer: {
        [owlsApi.reducerPath]: owlsApi.reducer,
        [tonApi.reducerPath]: tonApi.reducer,
        pairs: pairsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(owlsApi.middleware).concat(tonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
