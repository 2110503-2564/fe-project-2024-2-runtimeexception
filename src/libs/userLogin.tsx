
export default async function userLogIn(userEmail:string,userPassword:string){
    const responses = await fetch("http://localhost:5000/api/v1/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            email:userEmail,
            password:userPassword,
        }),
        
    })
    if(!responses.ok){
        throw new Error("Failed to fetch login")
    }
    return await responses.json()
}