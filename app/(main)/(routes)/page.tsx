import { ToggleTheme } from "@/components/ToggleTheme";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <ToggleTheme/>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
