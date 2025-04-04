import { BookingItem } from "../../interfaces";

export default async function addBooking(
    bookDate: Date,
    dentist_Id: string,
    token: string,
): Promise<BookingItem | null> {
    try {
        const response = await fetch(`https://backendforfrontend.vercel.app/api/v1/dentists/${dentist_Id}/bookings`, {
            method: "POST",
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
            console.error("Failed to make a booking:", errorData);
            throw new Error(`Failed to make a booking: ${response.statusText}`);
        }

        const data: BookingItem = await response.json();
        return data;
    } catch (error) {
        console.error("Error making a booking:", error);
        return null;
    }
}