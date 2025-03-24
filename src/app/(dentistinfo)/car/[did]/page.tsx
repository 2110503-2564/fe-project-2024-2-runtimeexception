import Image from "next/image"
import getDentist from "@/libs/getDentist"
import Link from "next/link"
export default async function DentistDetailPage({params} : {params:{did:string}}){
    
const dentistDetail = await getDentist(params.did)

    // const mockCarRepo = new Map()
    // mockCarRepo.set("001" , {name:"Honda Civic",image: "/img/civic.jpg"})
    // mockCarRepo.set("002" , {name:"Honda Accord",image: "/img/accord.jpg"})
    // mockCarRepo.set("003" , {name:"Toyota Fortuner",image: "/img/fortuner.jpg"})
    // mockCarRepo.set("004" , {name:"Tesla Model 3",image: "/img/tesla.jpg"})

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{dentistDetail.data.model}</h1>
        <div className="flex flex-row my-5">
            <Image src={dentistDetail.data.picture}
            alt='Car Image'
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg w-[30%]"/>
        <div className="text-md mx-5">{dentistDetail.data.description}
            <div>Doors: {dentistDetail.data.doors}</div>
            <div>Seats: {dentistDetail.data.seats}</div>
            <div>Large Bags: {dentistDetail.data.large_bags}</div>
            <div>Small Bags: {dentistDetail.data.small_bags}</div>
            <div>Daily Rental Rate:{dentistDetail.data.dayRate} (insurance included)</div>
            <Link href={`/reservations?id=${params.did}&model=${dentistDetail.data.model}`}>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm">
                    Make Reservation
                </button>
            </Link>
        </div>
          
        </div>
        </main>
    )
}

export async function generateStaticParams(){
    return [{did:'001'} ,{did:'002'} ,{did:'003'} ,{did:'004'} ]
}