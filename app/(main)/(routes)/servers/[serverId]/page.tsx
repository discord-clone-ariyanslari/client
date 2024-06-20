import { currentProfile } from "@/lib/current-profile";
import prismadb from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ServerIdProps {
  params: {
    serverId: string;
  };
}
const ServerId = async ({ params }: ServerIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const server = await prismadb.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const intialChannel = server?.channels[0];

  if (intialChannel?.name !== "general") {
    return null;
  }
  return redirect(`/servers/${params.serverId}/channels/${intialChannel.id}`);
};

export default ServerId;
