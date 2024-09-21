"use client";

import { buttonVariants } from "@/components/ui/button";
import { ItemsCart } from "@/features/cart/items-cart";
import { Item } from "@/features/items/item";
import { getItems } from "@/lib/items/get-items";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { Loader } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import LoginPage from "../login/page";

export default function Home() {
  const userName = useUserStore((s) => s.userName);

  if (!userName) {
    return <LoginPage />;
  }

  return (
    <div className="flex max-h-full flex-col gap-8">
      <ItemsCart />
      <UpSellDessert />
      <Link
        href="/checkout/success"
        className={buttonVariants({ size: "sm", className: "w-full" })}
      >
        Complete checkout
      </Link>
    </div>
  );
}

const UpSellDessert = () => {
  const isDessert = useCartStore(
    (s) =>
      Object.values(s.items).filter((i) => i.item.category === "dessert")
        .length > 0
  );

  if (isDessert) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold">Would you like to try our dessert ?</p>
      <DessertList />
    </div>
  );
};

const DessertList = () => {
  const category = "dessert";
  const { data } = useSWR(`/items/${category}`, async () => {
    return getItems(category);
  });

  if (!data) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="flex w-full gap-4 overflow-x-auto">
      {data.map((cartItem) => (
        <Item
          className="h-fit w-32 shrink-0 grow"
          key={cartItem.id}
          item={cartItem}
        />
      ))}
    </div>
  );
};
