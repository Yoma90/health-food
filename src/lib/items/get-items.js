import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getItems = async (category) => {
  let request = collection(db, "items");

  if (category) {
    request = query(request, where("category", "==", category));
  }

  const itemsResult = await getDocs(request);

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
