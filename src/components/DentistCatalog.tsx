import Link from "next/link"
import ProductCard from "./ProductCard"

export default async function DentistCatalog({dentistJson}:{dentistJson:Object}){
   const dentistJsonReady = await dentistJson
    return(
        <>
        Explore {dentistJsonReady.count} models in our catalog
        <div style={{margin:"20px" , display:"flex" , flexDirection:"row" , flexWrap:"wrap" , justifyContent:"space-around" , alignContent:"space-around"}}>
            {
                dentistJsonReady.data.map((dentistItem:Object) =>(
                    <Link href={`/car/${dentistItem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                    <ProductCard dentistName={dentistItem.model} imgSrc={dentistItem.picture}
                 
               />
               </Link>
                ))
            }
           </div>
        </>
    )
}