'use client'

import { useEffect, useState } from "react";
import { ServerModal } from "../modals/ServerModal"
import { InviteModal } from "../modals/InviteModal/InviteModal";

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
        <InviteModal/>
        </>
    )
}
