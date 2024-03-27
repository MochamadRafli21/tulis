"use client"
import { useState } from 'react';
import Image from 'next/image';
import SetDisplay from "../atoms/SetDisplay"
import { Label, Button, UploadPreview } from "../atoms"
import { uploadFile } from '@/libs/hooks';

export default function BannerInput({ image_url }: { image_url?: string }) {
  const [value, setValue] = useState(image_url ?? "");
  const setImage = async (e: any) => {
    const file = e.target.files[0];
    const link = await uploadFile(file);
    setValue(link);
  }
  return (
    <>
      <SetDisplay defaultOn={!!image_url}>
        <SetDisplay.ShowContent>
          <div className='aspect-auto rounded box-content items-center justify-center flex'>
            {value ?
              <Image
                src={value}
                alt="banner"
                width={300}
                height={200}
                className='rounded object-contain h-[200px]'
              />
              :
              <Label htmlFor="image_url" className='z-10 p-4 rounded border border-gray-300 hover:bg-gray-600'>
                <UploadPreview />
              </Label>
            }
            <input id="image_url" type="file" onChange={(e) => setImage(e)} name="image_url" className='hidden' />
            <input id="banner" type="text" name="banner" className='hidden' defaultValue={value} />
          </div>
          <SetDisplay.ToggleDisplay onClick={() => setValue("")}>
            <Button className="mt-4 w-full" variant={"danger"}>Remove Banner</Button>
          </SetDisplay.ToggleDisplay>
        </SetDisplay.ShowContent>

        <SetDisplay.HideContent>
          <SetDisplay.ToggleDisplay onClick={() => setValue("")}>
            <Button className="w-full" variant={"bordered"}>Add Banner</Button>
          </SetDisplay.ToggleDisplay>
        </SetDisplay.HideContent>
      </SetDisplay>

    </>
  )
}
