'use client'
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import DateBooking from "./DateBooking";

import { BookingItem, DentistItem } from '../../interfaces';
import { Session } from "next-auth";
import updateBooking from "@/libs/updateBooking";
import { redirect } from "next/navigation";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface BookingFormProps {
    session: Session ;
    dentist: DentistItem;
    book: BookingItem;
}

export default function EditBooking({session,dentist,book}:BookingFormProps){

    
    const [dateTime , setDatetime] = useState<Date | null >(null);


    // {onDateChange,initialDate}:{onDateChange:Function,initialDate:Dayjs}

    
    const updatingBooking = async () => {
        
                if(!dateTime)return;
                const user = session.user.name;
                
                try {
                    // await dbConnect();
                    const result = await updateBooking(dateTime ,book._id ,session.user.token);
                    console.log('Booking Success')
                } catch (error) {
                    console.error("Booking Error:", error);
                    console.log('Booking Failed');
                }
                // revalidateTag("bookings");
                redirect("/yourbook");
            };
            
            const bookD = dayjs(book.bookDate);
            return(
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex justify-center items-center">
        <form 
        action={updatingBooking}
        className="flex flex-col items-center">
        <div className="text-3xl font-medium text-center mb-4 font-serif">Edit Booking</div>
                <div className="space-x-5 space-y-2 w-fit px-6 py-5 flex flex-row justify-center">
                    <div>Old date : {bookD.format("D MMMM YYYY h:mm A")}
                    </div>
                </div>
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
                Edit
            </button>
        </form>
    </div>
    );
}