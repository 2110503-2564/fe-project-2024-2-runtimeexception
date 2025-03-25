export default async function getBookings(token: string){

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        next:{tags:['books']}
    });
    if(!response.ok){
        throw new Error("Failed to fetch Bookings")
    }
    return await response.json()
}