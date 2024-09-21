/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/lib/store/use-cart-store";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export const Item = ({ item, className }) => {
  return (
    <div
      className={cn(
        "relative rounded-md border p-3 shadow-inner h-fit",
        className
      )}
    >
      <p className="absolute right-2 top-2 font-mono">
        {formatPrice(item.price)}
      </p>
      <img
        src={item.image}
        className="aspect-square w-full rounded-md object-contain"
      />
      <p>{item.name}</p>
      <div className="flex items-end justify-end">
        <CartButton item={item} />
      </div>
    </div>
  );
};

const CartButton = ({ item }) => {
  const quantity = useCartStore((s) => s.items[item.id]?.quantity);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!quantity) {
    return (
      <Button
        onClick={() => {
          addItem(item);
        }}
      >
        Add
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          removeItem(item);
        }}
        size="sm"
        variant="outline"
      >
        <Minus size={12} />
      </Button>
      <p>{quantity}</p>

      <Button onClick={() => addItem(item)} size="sm" variant="outline">
        <Plus size={12} />
      </Button>
    </div>
  );
};
