import { getItems } from "@/lib/items/get-items";
import { useCategoryStore } from "@/lib/store/use-category-store";
import useSWR from "swr";
import { Item } from "./item";

export const ItemsList = () => {
  const category = useCategoryStore((c) => c.category);
  const { data } = useSWR(`/items/${category}`, async () => {
    return getItems(category);
  });

  return (
    <div className="grid max-h-full grid-cols-2 gap-3 overflow-x-auto pb-16">
      {data?.map((d) => (
        <Item item={d} key={d.id} />
      ))}
    </div>
  );
};
