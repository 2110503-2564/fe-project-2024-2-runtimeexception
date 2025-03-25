import BookingCart from "@/components/BookingCart";
import getBookings from "@/libs/getBookings";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function CartPage() {

    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    const bookings = await getBookings(session?.user.token);


    return (
        <main>
    <BookingCart bookJson={bookings}></BookingCart>
        </main>
    );
}
