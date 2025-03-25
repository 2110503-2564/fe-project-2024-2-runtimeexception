export default async function getBooking(id:string,token:string){

    const response = await fetch(`https://backendforfrontend.vercel.app/api/v1/bookings/${id}`,{
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