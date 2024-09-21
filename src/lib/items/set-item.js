import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";

export const setItem = async (id, item) => {
  // Si l'image est un fichier
  if (item.image instanceof File) {
    const path = `images/${item.image.name}`;
    const imageRef = ref(storage, path);
    try {
      await uploadBytes(imageRef, item.image);
      const downloadUrl = await getDownloadURL(imageRef);
      item.image = downloadUrl;
      item.imagePath = path;
    } catch (e) {
      console.error(e);
    }
  }

  const docRef = doc(db, "items", id);

  await setDoc(docRef, item);
  // Le code qui sauvegarde un item
};
