import { configureStore } from '@reduxjs/toolkit';
import { owlsApi } from '../services/owlsApiSlice';
import pairsReducer from '../features/pairsSlice'


export const store = configureStore({
    reducer: {
        [owlsApi.reducerPath]: owlsApi.reducer,
        pairs: pairsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(owlsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
