// src/redux/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces";

interface CartState {
    bookingItems: BookingItem[]; // Changed from dentistItems to bookingItems
}

const initialState: CartState = {
    bookingItems: [] // Changed from dentistItems to bookingItems
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookingItems.push(action.payload); // Changed from dentistItems to bookingItems
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookingItems = state.bookingItems.filter(obj => obj.bookDate !== action.payload.bookDate); // Changed from dentistItems to bookingItems
        }
    }
});

export const { addBooking, removeBooking } = cartSlice.actions;
export default cartSlice.reducer;
