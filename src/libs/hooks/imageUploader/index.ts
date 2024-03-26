export const uploadFile = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "nextjs-blog");
  const res = await fetch(
    "http://localhost:3000/api/images",
    {
      method: "POST",
      body: data,
    }
  );
  const data2 = await res.json();
  return data2.imageUrl;
};
