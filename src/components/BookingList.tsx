export default async function BookingList({bookingJson}:{bookingJson:Object}){
   const bookingJsonReady = await bookingJson

    return(
        <>
        <h1>test</h1>
        {
            bookingJsonReady.count===0 ?(
                <div className="text-center text-gray-500 pt-10 texl-8xl">No Dentist Booking</div>
            ):(
                bookingJsonReady.data.map((bookingItem:Object)=>(
                <div className="bg-slate-200 rounded rounded-lg px-5 mx-5 py-5 my-2">
                    <div className="text-md">Name: {bookingItem.dentist.name}</div>
                    <div className="text-md">Date: {bookingItem.bookDate}</div>
                    <div className="text-md">CreatedAt: {bookingItem.createdAt}</div>
                    {/* <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" 
                    onClick={()=>dispatch(removeBooking(bookingItem))}>
                    Remove from List</button> */}
                </div>
                
            )))

        }
        </>
    )
}