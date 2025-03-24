
import { deflate } from 'zlib'
import InteractiveCard from './InteractiveCard'
import Image from 'next/image'

export default function ProductCard({dentistName, imgSrc , onCompare} : {dentistName:string,imgSrc:string , onCompare?:Function}){
    return(
        <InteractiveCard contentName={dentistName}>

            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc }
                alt = 'Product Picture'
                fill = {true}
                className='object-cover rounded-t-lg'
                />
            </div>

            <div className='w-full h-[15%] p-[10px]'>{dentistName}</div>
         
        { 
            onCompare?<button className='block h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm' 
        onClick={(e)=>{e.preventDefault(); onCompare(dentistName)}}
        >
            Compare</button>:'' }
       
        </InteractiveCard>
    )
}
