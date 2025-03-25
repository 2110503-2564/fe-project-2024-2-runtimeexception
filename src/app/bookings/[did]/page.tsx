import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/db/dbConnect";
import Booking from "@/db/models/Booking";
import { revalidateTag } from "next/cache";
import { redirect, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import addBooking from "@/libs/addBooking";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import DateBooking from "@/components/DateBooking";
import BookingForm from "@/components/BookingForm";
import getDentist from "@/libs/getDentist";
import getBookings from "@/libs/getBookings";
import Link from "next/link";
import getUserProfile from "@/libs/getUserProfile";

export default async function BookingPage({ params }: { params: { did: string } }) {

    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    const profile = await getUserProfile(session.user.token);
    
    revalidateTag("bookings");
    const dentist = await getDentist(params.did);
    const book = await getBookings(session.user.token);

    // console.log("Url id = : : " , params.did);
    return (
        <main className="bg-slate-100 flex items-center justify-center min-h-screen p-5">
            {
                (profile.data.role=='user'&& book.count>=1)?        
                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        You already have a booking
                    </h1>
                    <Link href="/yourbook" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Return to Your Booking
                    </Link>
                </div>
            </div>
                :
            <BookingForm session={session} dentist={dentist.data}/>
            }
        </main>
    );
}