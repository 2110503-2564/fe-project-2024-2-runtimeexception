export default async function getDentist(id:string){
    const response = await fetch(`https://backendforfrontend.vercel.app/api/v1/dentists/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch dentists")
    }
    return await response.json()
}