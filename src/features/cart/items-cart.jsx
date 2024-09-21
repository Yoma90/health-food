import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCartPrice, useCartStore } from "@/lib/store/use-cart-store";
import { cn } from "@/lib/utils";
import { Minus, Trash } from "lucide-react";

export const ItemsCart = ({ className }) => {
  const price = useCartPrice();
  const items = useCartStore((s) => s.items);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold">Cart</h2>
        <p className="ml-auto font-mono">{formatPrice(price)}</p>
      </div>
      <div
        className={cn("flex flex-col gap-2 overflow-y-auto py-2", className)}
      >
        {Object.values(items).map((cartItem) => (
          <CartLineItem
            quantity={cartItem.quantity}
            item={cartItem.item}
            key={cartItem.item.id}
          />
        ))}
      </div>
    </div>
  );
};

const CartLineItem = ({ item, quantity }) => {
  const removeItem = useCartStore((s) => s.removeItem);
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-14 rounded-md border bg-accent/50 p-1">
        <img src={item.image} alt={`${item.name}'s image`} />
        <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border bg-accent text-sm">
          {quantity}
        </span>
      </div>
      <p className="font-bold">{item.name}</p>
      <p className="ml-auto font-mono text-sm">
        {formatPrice(item.price * quantity)}
      </p>
      <Button size="sm" variant="outline" onClick={() => removeItem(item)}>
        {quantity === 1 ? <Trash size={12} /> : <Minus size={12} />}
      </Button>
    </div>
  );
};
