'use client'
import { useRouter } from 'next/navigation'
import styles from './banner.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
export default function Banner (){
    const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg']
    const[index,setIndex] = useState(0);
    const router = useRouter()
    const{data:session} = useSession()
    console.log(session?.user.token)
    
    const bannerTextStyle = {
        color: '#00ACC1',
        WebkitTextStrokeWidth: '1px',
        WebkitTextStrokeColor: '#000',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
    };

    return(
        <div className={styles.banner} onClick={()=>{setIndex(index+1)}}>
            <Image src={covers[index%3]} 
            alt = 'cover' 
            fill={true}
            objectFit='cover'/>
    <div className={styles.bannerText}>
        <h1 className='text-5xl font-medium' style={bannerTextStyle} >If you want to find some good Dentist</h1>
        <h3 className='text-4xl font-serif' style={bannerTextStyle}> It’s only us can help you!!</h3>
    </div>
    {
        session? <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>Hello {session.user?.name}</div>:null
    }
        <button className='bg-white text-cyan-600 border border-cyan-600
        font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
        hover:bg-cyan-600 hover:text-white hover:border-transparent'
        onClick={(e)=> {e.stopPropagation; router.push('/car')}}>
            Select Your Dentist NOW
        </button>
        </div>
    )
}
