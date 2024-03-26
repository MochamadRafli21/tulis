import { cloudinaryClient } from '@/libs/utils'

export const uploadImage = async (image: File) => {
  const arrayBuffer = await image.arrayBuffer()
  const fileStream = Buffer.from(arrayBuffer)
  return new Promise((resolve, reject) => cloudinaryClient.uploader.upload_stream({ "resource_type": "auto" },
    (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result?.secure_url)
      }
    }).end(fileStream)
  )
}
