import dayjs from "dayjs";
import { BookingItem, BookJson } from "../../interfaces";
import deleteBooking from "@/libs/deleteBooking";

    
export default async function BookingCart({bookJson}:{bookJson:BookJson}){

    const bookJsonReady = await bookJson;

    
    return(
        <>
        {
            bookJsonReady.data.map((bookingItem:BookingItem)=>{
                const bookD = dayjs(bookingItem.bookDate).format("D MMMM YYYY h:mm A")
                const create = dayjs(bookingItem.createdAt).format("DD/MM/YYYY");
                return(
                    <div className="bg-slate-200 rounded-lg px-5 mx-5 py-2 my-2 relative" key={bookingItem.dentist.name}>
                    <div className="text-xl">Dentist's name: {bookingItem.dentist.name}</div>
                    <div className="text-md">Date & Time: {bookD}</div>
                    <div className="text-sm text-gray-400">Created at: {create}</div>
                    <div className="text-sm text-gray-400">BookingID: {bookingItem._id}</div>
                    

                    <div className="flex flex-row absolute space-x-2 bottom-2 right-2">
                    <button className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" >
                    Edit</button>
                    <button className="rounded-md bg-sky-600 hover:bg-rose-600 px-3 py-2 text-white shadow-sm" 
                    >
                    Delete</button>
                    </div>
                </div>
            )})
        }
        </>

    );
}