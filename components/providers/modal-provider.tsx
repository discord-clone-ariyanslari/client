"use client";

import { useEffect, useState } from "react";
import { ServerModal } from "../modals/ServerModal";
import { InviteModal } from "../modals/InviteModal/InviteModal";
import { EditServerModal } from "../modals/EditServerModal";
import { MembersModal } from "../modals/MembersModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal/>
    </>
  );
};
