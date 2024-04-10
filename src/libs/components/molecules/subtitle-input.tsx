"use client"
import { useState } from 'react';

import SetDisplay from "../atoms/set-display"
import { Label, Button, TextArea } from "../atoms"


export default function SubtitleInput({ subtitle }: { subtitle?: string }) {
  const [value, setValue] = useState(subtitle ?? "");
  return (
    <>
      <input type="hidden" name="subtitle" value={value} />
      <SetDisplay defaultOn={!!subtitle}>
        <SetDisplay.ShowContent>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <TextArea
              inputSize={"sm"}
              placeholder="Perjalanan indah menuju masa depan"
              rows={3}
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
              className='w-full min-h-[100px]'
              name="title"
            />
          </div>
          <SetDisplay.ToggleDisplay onClick={() => setValue("")}>
            <Button className="mt-2 w-full" variant={"danger"}>Remove Subtitle</Button>
          </SetDisplay.ToggleDisplay>
        </SetDisplay.ShowContent>

        <SetDisplay.HideContent>
          <SetDisplay.ToggleDisplay onClick={() => setValue(subtitle ?? "")}>
            <Button className="w-full" variant={"bordered"}>Add Subtitle</Button>
          </SetDisplay.ToggleDisplay>
        </SetDisplay.HideContent>
      </SetDisplay>

    </>
  )
}
