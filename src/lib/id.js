import { nanoid } from "nanoid";

export const getId = (name) => {
  const formattedName = name
    .replace(/\s+/g, "-")
    .substring(0, 10)
    .toLowerCase();
  const uniqueId = nanoid(4);
  return `${formattedName}-${uniqueId}`;
};
