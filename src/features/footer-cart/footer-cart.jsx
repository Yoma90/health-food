"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCartPrice } from "@/lib/store/use-cart-store";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ItemsCart } from "../cart/items-cart";

export const FooterCart = () => {
  const [open, setOpen] = useState(false);

  const price = useCartPrice();

  return (
    <div className="fixed inset-x-0 bottom-0 m-auto flex max-w-md flex-col gap-4 rounded-t-lg border-x border-t bg-card p-4 pt-8">
      <Button
        className="absolute inset-x-4 top-0 hover:bg-transparent"
        variant="ghost"
        size="sm"
        onClick={() => setOpen((s) => !s)}
      >
        {open ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
      </Button>
      {open ? <ItemsCart /> : null}
      <div className="flex items-center gap-2">
        <Link
          href="/checkout"
          className={buttonVariants({ size: "sm", className: "w-full" })}
        >
          Checkout
        </Link>
        {!open ? (
          <p className="ml-auto font-mono">{formatPrice(price)}</p>
        ) : null}
      </div>
    </div>
  );
};
