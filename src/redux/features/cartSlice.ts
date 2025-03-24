// src/redux/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces";

interface CartState {
    bookingItems: BookingItem[];
}

const initialState: CartState = {
    bookingItems: []
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookingItems.push(action.payload);
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookingItems = state.bookingItems.filter(
                (obj) =>
                    !(
                        obj.bookDate === action.payload.bookDate &&
                        obj.bookTime === action.payload.bookTime && // Check bookTime
                        obj.user === action.payload.user &&
                        obj.dentist === action.payload.dentist &&
                        obj.createAt === action.payload.createAt
                    )
            );
        }
    }
});

export const { addBooking, removeBooking } = cartSlice.actions;
export default cartSlice.reducer;
