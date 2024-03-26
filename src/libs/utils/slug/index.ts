import { nanoid } from "nanoid";

export const generateSlug = (title: string) => {
  const uniqueId = nanoid();
  return `${title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}-${uniqueId}`;
};
