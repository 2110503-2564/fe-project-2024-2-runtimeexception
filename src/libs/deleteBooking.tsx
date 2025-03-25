export default async function deleteBooking(token: string, id: string){

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization": `Bearer ${token}`
        },
        next:{tags:['delBooks']}
    });
    if(!response.ok){
        throw new Error("Failed to fetch Bookings")
    }
    return await response.json()
}