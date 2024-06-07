"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Label, UploadPreview } from "../atoms"
import { uploadFile } from '@/libs/hooks';
import React from 'react'

export default function ImageUpload({
  image_url,
  name = "image",
  label,
  children
}: {
  image_url?: string,
  name?: string,
  label?: React.ReactNode
  children?: React.ReactNode
}) {
  const [value, setValue] = useState(image_url ?? "");
  const [child, setChild] = useState(children);
  const setImage = async (e: any) => {
    const file = e.target.files[0];
    const link = await uploadFile(file);
    console.log(link)
    setValue(link);
    const newChild = React.Children.map(children, (child) => {
      return React.cloneElement(child as React.ReactElement, { src: link })
    })
    setChild(newChild)
  }

  return (
    <>
      <Label htmlFor={name} >
        {value ?
          child ??
          <Image
            src={value}
            alt={name}
            fill={true}
            className='object-cover'
          />
          :
          label ? label : <UploadPreview />
        }
      </Label>
      <input id={name} type="file" accept="image/*" onChange={(e) => setImage(e)} name={name + "_file"} className='hidden' />
      <input id={name} type="text" name={name} className='hidden' defaultValue={value} />
    </>
  )
}
