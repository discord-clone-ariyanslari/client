import prismadb from "./db";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await findCoversation(memberOneId, memberTwoId)) ||
    (await findCoversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
};

const findCoversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await prismadb.conversation.findFirst({
      where: {
        AND: [
          { memberOneId: memberOneId },
          {
            memberTwoId: memberTwoId,
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};

const createNewConversation = async (
    memberOneId: string,
  memberTwoId: string
) => {
  try {
    return await prismadb.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {}
};
