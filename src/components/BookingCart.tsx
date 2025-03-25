import dayjs from "dayjs";
import { BookingItem, BookJson } from "../../interfaces";
import deleteBooking from "@/libs/deleteBooking";
import { Link } from "@mui/material";
import DeleteButton from "./DeleteButton";

    
export default async function BookingCart({bookJson,token}:{bookJson:BookJson,token:string}){

    const bookJsonReady = await bookJson;

    if (!bookJsonReady || !bookJsonReady.data || bookJsonReady.data.length === 0) {
        return <div className="text-center p-4 text-3xl">No bookings found.</div>;
      }
    
    return(
        <>
        {
            bookJsonReady.data.map((bookingItem:BookingItem)=>{
                const bookD = dayjs(bookingItem.bookDate).format("D MMMM YYYY h:mm A")
                const create = dayjs(bookingItem.createdAt).format("DD/MM/YYYY");

                const deleteBook = async()=>{
                    try{
                        const result = await deleteBooking(token,bookingItem._id)
                        console.log('Deleted Success')
                    }catch(error){
                        console.log(error);
                        console.log('Deleted Failed');
                    }
                }
                return(
                    <div className="bg-slate-200 rounded-lg px-5 mx-5 py-2 my-2 relative" key={bookingItem.dentist.name}>
                    <div className="text-xl">Dentist's name: {bookingItem.dentist.name}</div>
                    <div className="text-md">Date & Time: {bookD}</div>
                    <div className="text-sm text-gray-400">Created at: {create}  &  BookingID: {bookingItem._id}</div>
                    

                    <div className="flex flex-row absolute space-x-2 bottom-2 right-2">
                    <Link href={`/yourbook/${bookingItem._id}`}>
                    <button className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" >
                    Edit</button>
                    </Link>
                    <DeleteButton token={token} bookingId={bookingItem._id} />
                    {/* <button className="rounded-md bg-sky-600 hover:bg-rose-600 px-3 py-2 text-white shadow-sm" 
                    onClick={deleteBook}>
                    Delete</button> */}
                    </div>
                </div>
            )})
        }
        </>

    );
}