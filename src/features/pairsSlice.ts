import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pair } from '../types/pairs'

type PairState = {
    activePair: Pair | null;
    pairs: Pair[];
};

const initialState: PairState = {
    activePair: null,
    pairs: [],
};

export const pairsSlice = createSlice({
    name: 'pairs',
    initialState,
    reducers: {
        changeActivePair: (state, action: PayloadAction<Pair | null>) => {
            state.activePair = action.payload;
        },
        changePairs: (state, action: PayloadAction<Pair[]>) => {
            state.pairs = action.payload;
        },
    },
});

export const { changeActivePair, changePairs } = pairsSlice.actions;

export const selectPairs = (state: { pairs: PairState }) => state.pairs;

export default pairsSlice.reducer;
