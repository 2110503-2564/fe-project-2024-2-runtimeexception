'use client'
import Link from "next/link"
import ProductCard from "./ProductCard"
import { useReducer } from "react"
import { ClassNames } from "@emotion/react"
import { useRef ,useEffect , useState} from "react"
import getDentists from "@/libs/getDentists"
import { DentistInfo } from "../../interfaces"
export default function DentistPanel(){

    const [dentistResponse,setDentistResponse] = useState(null)

    useEffect(()=>{
      const fetchData = async()=>{
        const dentists = await getDentists()
        setDentistResponse(dentists)
      }  
      fetchData()
    },[])

    const countRef =useRef(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const compareReducer = (comparelist:Set<string> , action:{type:string , dentistName:string})=>{
        switch(action.type){
            case 'add':{
                return new Set(comparelist.add(action.dentistName))
            }
            case 'remove':{
                comparelist.delete(action.dentistName)
                return new Set(comparelist)
            }
            default: return comparelist
        }
    }

    const [comparelist,dispatchCompare] = useReducer(compareReducer,new Set<string>())

    //mock data
    // const mockCarRepo =[
    //     {cid: "001", name:"Honda Civic",image: "/img/civic.jpg"},
    //     {cid: "002", name:"Honda Accord",image: "/img/accord.jpg"},
    //     {cid: "003", name:"Toyota Fortuner",image: "/img/fortuner.jpg"},
    //     {cid: "004", name:"Tesla Model 3",image: "/img/tesla.jpg"}
    // ]

if(!dentistResponse) return (<p>Dentist Panel is Loading ...</p>)
    return(
        <div>
        <div style={{margin:"20px" , display:"flex" , flexDirection:"row" , flexWrap:"wrap" , justifyContent:"space-around" , alignContent:"space-around"}}>
            {
                dentistResponse.data.map((dentistItem) =>(
                    <Link href={`/dentist/${dentistItem.id}`} className="w-1/5" key={dentistItem.id}>
                    <ProductCard dentistName={dentistItem.model} imgSrc={dentistItem.picture}
                    onCompare={(dentist:string) => dispatchCompare({type:'add' , dentistName:dentist})}
               />
               </Link>
                ))
            }
           </div>
           <div className="w-fill text-xl font-medium">Compare List: {comparelist.size}</div>
            {Array.from(comparelist).map((dentist)=><div key={dentist} onClick={()=>dispatchCompare({type:'remove',dentistName:dentist})}>{dentist}</div>)}
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
            onClick={()=> {countRef.current = countRef.current+1; alert(countRef.current)}}>Count w Ref variable</button>
            <input type="text" placeholder="please fill" className="block text-gray-900 text-sm rounded-lg p-2 m-2 bg-purple-50 ring-1 rinf-inset ring-purple-400 focus:outline-none focus:bg-purple-200 focus:ring-2"
            ref={inputRef}/>
             <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
            onClick={()=> {if(inputRef.current !=null) inputRef.current.focus()}}>Focus Input</button>
        </div>
    )

} 
