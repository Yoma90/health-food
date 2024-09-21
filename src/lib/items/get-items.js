import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getItems = async () => {
  const itemsCollections = collection(db, "items");

  const itemsResult = await getDocs(itemsCollections);

  const items = [];

  itemsResult.forEach((i) => {
    const item = {
      id: i.id,
      ...i.data(),
    };

    items.push(item);
  });

  return items;
};
