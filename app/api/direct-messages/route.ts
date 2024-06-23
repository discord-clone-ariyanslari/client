import { currentProfile } from "@/lib/current-profile";
import prismadb from "@/lib/db";
import { DirectMessage } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAES_BATCH = 10;
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const conversationId = searchParams.get("conversationId");
    console.log(conversationId);

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!conversationId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }
    let messages: DirectMessage[] = [];
    if (cursor) {
      messages = await prismadb.directMessage.findMany({
        take: MESSAES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          conversationId: conversationId as string,
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
      messages = await prismadb.directMessage.findMany({
        take: MESSAES_BATCH,
        where: {
          conversationId: conversationId,
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
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("[DIRECT_MESSAGES_GET]", error);
    return new NextResponse("Internal Error ", { status: 500 });
  }
}
