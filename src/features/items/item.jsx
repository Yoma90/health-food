/* eslint-disable @next/next/no-img-element */
import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { deleteItem } from "@/lib/items/delete-item";
import { useAdminStore } from "@/lib/store/use-admin-store";
import { useCartStore } from "@/lib/store/use-cart-store";
import { cn } from "@/lib/utils";
import { Edit, Minus, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { mutate } from "swr";

export const Item = ({ item, className }) => {
  const adminEnabled = useAdminStore((s) => s.adminEnabled);
  return (
    <div
      className={cn(
        "relative rounded-md border p-3 shadow-inner h-fit group",
        className
      )}
    >
      {adminEnabled ? (
        <div className="absolute left-2 top-2 flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
          <Link
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href={`/items/${item.id}`}
          >
            <Edit size={12} />
          </Link>
          <DeleteButton item={item} />
        </div>
      ) : null}
      <p className="absolute right-2 top-2 font-mono">
        {formatPrice(item.price)}
      </p>
      <img
        src={item.image}
        className="aspect-square w-full rounded-md object-contain"
      />
      <p>{item.name}</p>
      <div className="flex">
        <CartButton item={item} />
      </div>
    </div>
  );
};

const DeleteButton = ({ item }) => {
  const onDelete = async () => {
    await deleteItem(item);
    toast.success("Item was deleted");
    mutate((key) => typeof key === "string" && key.startsWith("/items"));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Trash size={12} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You will delete the item with id {item.id}
          </AlertDialogTitle>
          <AlertDescription>
            Are you sure ? This action is irreversible.
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const CartButton = ({ item }) => {
  const quantity = useCartStore((s) => s.items[item.id]?.quantity);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!quantity) {
    return (
      <Button
        size="sm"
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
