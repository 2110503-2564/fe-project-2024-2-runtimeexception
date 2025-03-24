import getDentists from "@/libs/getDentists"
import DentistCatalog from "@/components/DentistCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import DentistPanel from "@/components/DentistPanel"
export default  function Dentist(){
    const dentists = getDentists()
    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
            <Suspense fallback={<p>Loading...<LinearProgress></LinearProgress></p>}>
            <DentistCatalog dentistJson={dentists}/>
       </Suspense>
       <hr className="my-10"/>
       <h1 className="text-xl font-medium">TRY Client-Side Car Panel</h1>
        <DentistPanel/>
        </main>
    )
}