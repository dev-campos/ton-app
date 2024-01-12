import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
  // Add other properties as needed
}

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: []
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    // Add more reducers as needed
  },
});

export const { addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
