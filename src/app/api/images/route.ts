import { NextResponse, NextRequest } from 'next/server'
import { uploadImage } from '@/libs/services/cloudinary'

export async function POST(req: NextRequest) {
  console.log('test')
  const data = await req.formData()
  const file = data.get('file')
  if (!file) {
    return NextResponse.json({ message: "Please provide a file" }, { status: 400 })
  }

  const imageUrl = await uploadImage(file as File)
  return NextResponse.json({ imageUrl })
}
