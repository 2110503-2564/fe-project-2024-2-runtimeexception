import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'; 
import { Link } from '@mui/material';

export default async function TopMenu(){

    const session = await getServerSession(authOptions);

    return (
        <div className={styles.menucontainer}>
            
            <Link href='/'>
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo'
            width={0} height={0} sizes='100vh'/>
            </Link>
            <TopMenuItem title='Your Booking' pageRef='/yourbook'/>
           
            
            
            <div className='flex flex-row absolute right-0 h-full'>
            {session ? null : <TopMenuItem title='Sign up' pageRef='/register'/>}
            {
                session ? <Link href='/api/auth/signout'>
                    <div className='flex items-center h-full px-2 text-cyan-600 text-md'>
                    Sign-Out of {session.user?.name} </div>
                    </Link>
                 
                   
                :<Link href='/api/auth/signin'>
                    <div className='flex items-center h-full px-2 text-cyan-600 text-md'>
                    Sign-In</div></Link>
                   
            }
            </div>
        </div>
    );
}