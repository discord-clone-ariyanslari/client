import { currentProfile } from "@/lib/current-profile";
import prismadb from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAES_BATCH = 10;
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }
    let messages: Message[] = [];
    if (cursor) {
      messages = await prismadb.message.findMany({
        take: MESSAES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await prismadb.message.findMany({
        take: MESSAES_BATCH,
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    let nextCursor = null;
    if (messages.length === MESSAES_BATCH) {
      nextCursor = messages[MESSAES_BATCH - 1].id;
    }
    return NextResponse.json({
        items:messages,
        nextCursor
    })
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error ", { status: 500 });
  }
}
