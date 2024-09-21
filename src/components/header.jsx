"use client";

import { useCartQuantity } from "@/lib/store/use-cart-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { ShoppingBasket, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="flex items-center gap-2 border-b px-4 py-2 shadow-sm">
      <Link href="/" className="inline-flex items-center gap-2">
        <Image
          src="/healthdonals.png"
          alt="Healthdonals"
          width={32}
          height={32}
        />
        <p className="text-sm font-bold">Healthdonals</p>
      </Link>
      <div className="ml-auto"></div>
      <UserNameHeader />
      <ShoppingCartButton />
    </header>
  );
};

const ShoppingCartButton = () => {
  const quantity = useCartQuantity();
  return (
    <Button
      size="sm"
      variant="outline"
      className="inline-flex items-center gap-2"
    >
      {quantity}
      <ShoppingBasket size={12} />
    </Button>
  );
};

const UserNameHeader = () => {
  const userName = useUserStore((s) => s.userName);
  const logout = useUserStore((s) => s.logout);

  if (!userName) {
    return null;
  }

  return (
    <button onClick={() => logout()} className="flex items-center gap-2">
      <User size={12} />
      <p className="text-sm">{userName}</p>
    </button>
  );
};
