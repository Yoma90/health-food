import { getItems } from "@/lib/items/get-items";
import useSWR from "swr";
import { Item } from "./item";

export const ItemsList = () => {
  const { data } = useSWR("/items", async () => {
    return getItems();
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {data?.map((d) => (
        <Item item={d} key={d.id} />
      ))}
    </div>
  );
};
