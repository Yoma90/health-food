"use client";

import { CategoryList } from "@/features/categories/category-list";
import { FooterCart } from "@/features/footer-cart/footer-cart";
import { ItemsList } from "@/features/items/items-list";
import { useUserStore } from "@/lib/store/use-user-store";
import LoginPage from "./login/page";

export default function Home() {
  const userName = useUserStore((s) => s.userName);

  if (!userName) {
    return <LoginPage />;
  }

  return (
    <div className="flex max-h-full flex-col">
      <div className="flex flex-1 gap-4 overflow-hidden">
        <CategoryList />
        <ItemsList />
      </div>
      <FooterCart />
    </div>
  );
}
