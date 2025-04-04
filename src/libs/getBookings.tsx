export default async function getBookings(token: string){

    const response = await fetch('https://backendforfrontend.vercel.app/api/v1/bookings',{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${token}`
        },
        next:{tags:['books']}
    });
    if(!response.ok){
        throw new Error("Failed to fetch Bookings")
    }
    return await response.json()
}