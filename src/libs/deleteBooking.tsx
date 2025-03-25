export default async function deleteBooking(token: string, booking_id: string){

    const response = await fetch(`https://backendforfrontend.vercel.app/api/v1/bookings/${booking_id}`,{
        method:"DELETE",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });
    if(!response.ok){
        throw new Error("Failed to fetch Bookings")
    }
    return await response.json()
}