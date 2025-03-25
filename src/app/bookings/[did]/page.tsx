import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

export default async function BookingPage({ params }: { params: { did: string } }) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    
    revalidateTag("bookings");
    const dentist = await getDentist(params.did);

    // console.log("Url id = : : " , params.did);
    return (
        <main className="bg-slate-100 flex items-center justify-center min-h-screen p-5">
            <BookingForm session={session} dentist={dentist.data}/>
        </main>
    );
}