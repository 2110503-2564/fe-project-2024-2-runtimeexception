import Image from "next/image"
import getDentist from "@/libs/getDentist"
import Link from "next/link"
export default async function DentistDetailPage({params} : {params:{did:string}}){
    
const dentistDetail = await getDentist(params.did)

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{dentistDetail.data.name}</h1>
            <div className="flex flex-row my-5">
            <Image src={dentistDetail.data.picture}
            alt='Dentist Image'
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg w-[30%]"/>
            <div className="text-md mx-5 text-left bg-slate-200 h-full p-5 rounded-xl">Name: {dentistDetail.data.name}
            <div>Expirience: {dentistDetail.data.expirience}</div>
            <div>Expertise: {dentistDetail.data.expertise.join(", ")}</div>
            <Link href={`/bookings?id=${params.did}&name=${dentistDetail.data.name}`}>
                <button className="block rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-1 text-white shadow-sm">
                    Make Booking
                </button>
            </Link>
        </div>
          
        </div>
        </main>
    )
}