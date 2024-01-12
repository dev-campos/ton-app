import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/wallet/walletSlice';
// Import other slices if you have them

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        // Add other slice reducers here
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
