// src/libs/userRegister.tsx
export default async function userRegister(userEmail:string,userPassword:string,userName:string,userTel:string,userRole:string){
    const responses = await fetch("http://localhost:5000/api/v1/auth/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            name:userName,
            tel:userTel,
            email:userEmail,
            password:userPassword,
            role:userRole


        }),

    })
    if(!responses.ok){
        throw new Error("Failed to register") // Changed this line!
    }
    return await responses.json()
}
