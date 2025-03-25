export default async function addBooking(dentId:string,date:string){
    const responses = await fetch(`http://localhost:5000/api/v1/auth/dentists/${dentId}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            bookDate:date,
        }),
        
    })
    if(!responses.ok){
        throw new Error("Failed to make a booking")
    }
    return await responses.json()
}