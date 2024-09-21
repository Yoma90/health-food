import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getItem = async (itemId) => {
  const items = collection(db, "items");
  const item = await getDoc(doc(items, itemId));

  if (item.exists()) {
    return {
      ...item.data(),
      id: itemId,
    };
  }

  return null;
};
