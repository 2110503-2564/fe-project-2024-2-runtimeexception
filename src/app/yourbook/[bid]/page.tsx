import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import DateBooking from "@/components/DateBooking"
import EditBooking from "@/components/EditBooking"
import getBooking from "@/libs/getBooking"
import getDentist from "@/libs/getDentist"
import getUserProfile from "@/libs/getUserProfile"
import updateBooking from "@/libs/updateBooking"
import { getServerSession } from "next-auth"
import Image from "next/image"

import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react"
export default async function BookingDetailPage({params} : {params:{bid:string}}){
    
    const session = await getServerSession(authOptions);
    
        if (!session || !session.user) {
            redirect("/api/auth/signin");
        }

        console.log('BID:--> ' + params.bid);
    const bookingDetail = await getBooking(params.bid,session.user.token)
    const dentistDetail = await getDentist(bookingDetail.data.dentist.id)
    

    return(
        <main className="bg-slate-100 flex items-center justify-center min-h-screen p-5">
            <EditBooking session={session} dentist={dentistDetail.data} book={bookingDetail.data}/>
        </main>
    )
}