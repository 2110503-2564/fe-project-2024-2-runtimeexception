import BookingCart from "@/components/BookingCart";
import getBookings from "@/libs/getBookings";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function CartPage() {

    const session = await getServerSession(authOptions);
    
    const bookings = await getBookings(session?.user.token);


    return (
        <main>
            <BookingCart bookJson={bookings}></BookingCart>
        </main>
    );
}
