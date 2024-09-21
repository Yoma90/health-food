import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase";

export const deleteItem = async (item) => {
  if (item.imagePath) {
    const storageKey = ref(storage, item.imagePath);
    await deleteObject(storageKey);
  }

  await deleteDoc(doc(db, "items", item.id));
};
