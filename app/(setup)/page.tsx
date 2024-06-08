import { IntialModal } from "@/components/modals";
import prismadb from "@/lib/db";
import { initialProfile } from "@/lib/intial-profile";
import { redirect } from "next/navigation";
import React from "react";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await prismadb.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if(server){
    return redirect(`/servers/${server.id}`)
  }
  return <IntialModal/>;
};

export default SetupPage;
