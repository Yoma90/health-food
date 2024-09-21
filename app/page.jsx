"use client";

import { ItemsList } from "@/features/items/items-list";
import { useUserStore } from "@/lib/store/use-user-store";
import LoginPage from "./login/page";

export default function Home() {
  const userName = useUserStore((s) => s.userName);

  if (!userName) {
    return <LoginPage />;
  }

  return (
    <div>
      <ItemsList />
    </div>
  );
}
