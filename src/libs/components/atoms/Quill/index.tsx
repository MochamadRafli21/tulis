"use client"
import dynamic from 'next/dynamic'

import { cn } from '@/libs/utils/cn'
import React, { useState, useMemo } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const uploadFile = async (file: File) => {
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
  return data2.secure_url;
};

const customImageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    try {
      const link = await uploadFile(file);
      this.quill.insertEmbed(this.quill.getSelection(), "image", link);
    } catch (err) {
      console.log("upload err:", err);
    }
  };
};

export const Quill = (
  { className, name, content }: { className?: string, name?: string, content?: string }) => {
  const [value, setValue] = useState(content ?? "");



  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: customImageHandler
      },
    }
  }), [])

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
        modules={modules}
        formats={[
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
          'list', 'bullet', 'indent', 'link', 'image'
        ]}
      >
      </ReactQuill>
    </div >
  )
}
