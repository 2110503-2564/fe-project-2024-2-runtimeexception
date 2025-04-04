'use client'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { dbConnect } from '@/db/dbConnect';
import addBooking from '@/libs/addBooking';
import { Dayjs } from 'dayjs';
import { getServerSession, Session } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import DateBooking from './DateBooking';
import { DentistItem } from '../../interfaces';

interface BookingFormProps {
    session: Session ;
    dentist: DentistItem;
}

export default function BookingForm({session,dentist}:BookingFormProps){
    
    const [dateTime , setDatetime] = useState<Date | null >(null);

    const createBooking = async () => {
        
        if(!dateTime)return;
        const user = session.user.name;
        
        try {
            // await dbConnect();
            const result = await addBooking(dateTime ,dentist._id ,session.user.token);
            console.log('Booking Success')
        } catch (error) {
            console.error("Booking Error:", error);
            console.log('Booking Failed');
        }
        // revalidateTag("bookings");
        redirect("/yourbook");
    };
    
    return(
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex justify-center items-center">
                        <form action={createBooking} className="flex flex-col items-center">
                        <div className="text-3xl font-medium text-center mb-4 font-serif">New Booking</div>
                            <div className="w-full my-2">
                                <label className="block text-gray-700" htmlFor="dentist">Dentist</label>
                                <input type="text" id="dentist" name="dentist" value={dentist.name} 
                                    className="bg-gray-200 border-2 rounded w-full p-2 text-gray-700"
                                    disabled />
                            </div>

                            <div className="w-full my-2">
                                <DateBooking onDateChange={setDatetime}/>
                            </div>
        
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded mt-4 w-full">
                                Book Appointment
                            </button>
                        </form>
                    </div>
    );

}