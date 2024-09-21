"use client";

import { Toggle } from "@/components/ui/toggle";
import { useAdminStore } from "@/lib/store/use-admin-store";
import Link from "next/link";

export const AdminActions = () => {
  const adminStore = useAdminStore();
  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-2 rounded-md border p-2">
      <Link href="/items/new">New</Link>
      <Toggle
        pressed={adminStore.adminEnabled}
        onPressedChange={() => {
          adminStore.toggleAdminEnable();
        }}
      >
        Admin
      </Toggle>
    </div>
  );
};
