import getDentists from "@/libs/getDentists"
import DentistCatalog from "@/components/DentistCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { DentistJson } from "../../../../interfaces"
export default async function Dentist(){
    const dentists:DentistJson = await getDentists()
    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Our dentist in catalog</h1>
            <Suspense fallback={<p>Loading...<LinearProgress></LinearProgress></p>}>
            <DentistCatalog dentistJson={dentists}/>
       </Suspense>
        </main>
    )
}