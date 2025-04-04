import Link from "next/link"
import ProductCard from "./ProductCard"
import { DentistItem,DentistJson } from "../../interfaces";

export default async function DentistCatalog({dentistJson}:{dentistJson:DentistJson}){
    
    const dentistJsonReady = await dentistJson;

    return(
        <>
        <div style={{margin:"20px" , display:"flex" , flexDirection:"row" , flexWrap:"wrap" , justifyContent:"space-around" , alignContent:"space-around"}}>
            {
                dentistJsonReady.data.map((dentistItem:DentistItem) =>(
                    <Link href={`/dentist/${dentistItem._id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                    <ProductCard dentistName={dentistItem.name} imgSrc={dentistItem.picture}
                 
               />
               </Link>
                ))
            }
           </div>
        </>
    )
}