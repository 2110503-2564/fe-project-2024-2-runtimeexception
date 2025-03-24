"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BookingItem } from "../../../interfaces";

export default function YourBook() {
  const bookingItems = useSelector((state: RootState) => state.cart.bookingItems);

  return (
    <main className="bg-slate-100 m-5 p-5 flex flex-col items-center">
      <div className="text-xl font-medium text-center">Your Bookings</div>
      <br />
      {bookingItems.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="w-full max-w-3xl">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th> {/* New Time column */}
              <th className="border p-2">User</th>
              <th className="border p-2">Dentist</th>
              <th className="border p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookingItems.map((booking: BookingItem, index: number) => (
              <tr key={index}>
                <td className="border p-2">{booking.bookDate}</td>
                <td className="border p-2">{booking.bookTime}</td> {/* Display bookTime */}
                <td className="border p-2">{booking.user}</td>
                <td className="border p-2">{booking.dentist}</td>
                <td className="border p-2">{booking.createAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
