"use client"
import dynamic from 'next/dynamic'

import { cn } from '@/libs/utils/cn'
import React, { useState } from 'react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export const Quill = (
  { className, name }: { className?: string, name?: string }) => {
  const [value, setValue] = useState("");

  const imageHandler = (e: any) => {
    console.log(e)
  }


  return (
    <div className="text-editor">
      <input type="hidden" name={name} value={value} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className={
          cn(["h-[300px]", className])
        }
        modules={{
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ]
        }}
        formats={[
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
          'list', 'bullet', 'indent', 'link', 'image'
        ]}
        handlers={{
          image: imageHandler
        }}
      >
      </ReactQuill>
    </div >
  )
}
