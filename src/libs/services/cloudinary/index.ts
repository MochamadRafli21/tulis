"use server"

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


export const uploadImage = async (image: File) => {
  const data = await cloudinary.uploader.upload(image)
  return data.secure_url
}
