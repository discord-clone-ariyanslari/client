import { currentUser } from "@clerk/nextjs/server";
import prismadb from "./db";
import { redirect } from "next/navigation";

export const initialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const profile = await prismadb.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }
  const newProfile = await prismadb.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
};
