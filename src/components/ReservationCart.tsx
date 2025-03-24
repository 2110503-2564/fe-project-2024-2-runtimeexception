// src/components/ReservationCart.tsx
"use client"
import { removeBooking } from "@/redux/features/cartSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { BookingItem } from "../../interfaces"

export default function ReservationCart() {
  const bookingItems = useAppSelector((state) => state.cartSlice.bookingItems) // Use bookingItems here
  const dispatch = useDispatch<AppDispatch>()

  if (!bookingItems || bookingItems.length === 0) {
    return <div className="text-center">No bookings yet.</div>;
  }

  return (
    <>
      {bookingItems.map((bookingItem: BookingItem) => ( // Use bookingItem here
        <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.createAt}>
          <div className="text-xl">{bookingItem.createAt}</div>
          <div className="text-sm">Dentist: {bookingItem.dentist}</div> {/* Display dentist name */}
          <div className="text-sm">User: {bookingItem.user} </div> {/* Display user name */}
          <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm" onClick={() => dispatch(removeBooking(bookingItem))}> {/* Use bookingItem here */}
            Remove from Cart
          </button>
        </div>
      ))}
    </>
  )
}
