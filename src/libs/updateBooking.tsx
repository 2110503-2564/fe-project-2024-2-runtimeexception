import { BookingItem } from "../../interfaces";

export default async function updateBooking(
    bookDate: Date,
    book_Id: string,
    token: string,
): Promise<BookingItem | null> {
    try {
        const response = await fetch(`https://backendforfrontend.vercel.app/api/v1/bookings/${book_Id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                bookDate,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to update a booking:", errorData);
            throw new Error(`Failed to update a booking: ${response.statusText}`);
        }

        const data: BookingItem = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating a booking:", error);
        return null;
    }
}