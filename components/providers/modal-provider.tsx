'use client'

import { useEffect, useState } from "react";
import { ServerModal } from "../modals/ServerModal"

export const ModalProvider =()=>{
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
      }
    return( 
        <>
        <ServerModal />
        </>
    )
}
