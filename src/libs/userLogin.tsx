export default async function userLogin(userEmail:string, userPassword:string) {

    const response = await fetch(`https://backendforfrontend.vercel.app/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    });

    if(!response) {
        throw new Error("Failed to log-in");
    }


    return await response.json();
}