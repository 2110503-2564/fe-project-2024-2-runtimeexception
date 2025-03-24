import React from "react";
import ReservationMenu from "@/components/ReservationMenu";
import styles from './reservations.module.css'
export default function ReservationLatout ({children} : {children:React.ReactNode}){
    return(
        <div className={styles.sectionlayout}>
        
            {children}
        </div>
    );
}