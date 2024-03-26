"use client"
import dynamic from 'next/dynamic'

import { cn } from '@/libs/utils/cn'
import React, { FC, useState, useMemo, useRef } from 'react';
import { QuillOptions } from 'react-quill';
import type ReactQuill from 'react-quill';

import { uploadFile } from '@/libs/hooks';

interface ReactQuillProps extends QuillOptions {
  value: string
  className?: string
  onChange?: (value: string) => void
  forwadedRef?: any
}

const CustomReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const RQuill: FC<ReactQuillProps> = ({ forwadedRef, value, ...props }) => <RQ ref={forwadedRef} value={value} {...props} />;
    return RQuill
  },
  {
    ssr: false
  }
);



export const Quill = (
  { className, name, content }: { className?: string, name?: string, content?: string }) => {
  const [value, setValue] = useState(content ?? "");
  const quillRef = useRef<ReactQuill>(null);


  const customImageHandler = () => {
    console.log('image handler active')
    if (!quillRef.current) {
      console.error("Quill ref is not defined");
      return;
    }
    const editor = quillRef.current.getEditor();

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) {
        return;
      }
      const file = input.files[0];
      try {
        const link = await uploadFile(file);
        const cursorPosition = editor.getSelection()!.index;
        editor.insertEmbed(cursorPosition, "image", link);
        editor.setSelection({ index: cursorPosition + 1, length: 0 });
      } catch (err) {
        console.log("upload err:", err);
      }
    };
  };

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
      <CustomReactQuill
        forwadedRef={quillRef}
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
      </CustomReactQuill>
    </div >
  )
}
