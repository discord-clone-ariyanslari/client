import { ChatInput } from "@/components/chat";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { currentProfile } from "@/lib/current-profile";
import prismadb from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface ChannelIdProps {
  params: {
    serverId: string;
    channelId: string;
  };
}
const ChannelIdPage = async ({ params }: ChannelIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    redirectToSignIn();
  }
  const channel = await prismadb.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  const member = await prismadb.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile?.id,
    },
  });
  if (!channel || !member) {
    redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full ">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <ChatMessages
        member={member}
        chatId={channel.id}
        name={channel.name}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        name={channel.name}
        apiUrl={"/api/socket/messages"}
        type="channel"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
};

export default ChannelIdPage;
