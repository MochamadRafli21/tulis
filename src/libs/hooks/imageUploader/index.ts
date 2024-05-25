import imageCompression from "browser-image-compression";

export const uploadFile = async (file: File) => {
  const compressedIimage = await imageCompression(file, {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
  });
  const data = new FormData();
  data.append("file", compressedIimage);
  data.append("upload_preset", "nextjs-blog");
  const res = await fetch(
    "/api/images",
    {
      method: "POST",
      body: data,
    }
  );
  const data2 = await res.json();
  return data2.imageUrl;
};

