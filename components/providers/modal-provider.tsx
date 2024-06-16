"use client";

import { useEffect, useState } from "react";
import { ServerModal } from "../modals/ServerModal";
import { InviteModal } from "../modals/InviteModal/InviteModal";
import { EditServerModal } from "../modals/EditServerModal";
import { MembersModal } from "../modals/MembersModal";
import { CreateChannelModal } from "../modals/CreateChannelModal";
import { LeaveServerModal } from "../modals/LeaveServerModal";
import { DeleteServerModal } from "../modals/DeleteServerModal";

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
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal/>
      <DeleteServerModal/>
    </>
  );
};
