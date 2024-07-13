"use client"

import { Heart } from "lucide-react"
import { updateLikes } from "@/app/actions"
import { useState } from "react"

export const LikeBtn = ({ id, is_liked }: { id: string, is_liked: boolean }) => {
  const [isLiked, setIsLiked] = useState(is_liked)
  const handleLike = async (id: string) => {
    const success = await updateLikes(id)
    if (success != null) {
      setIsLiked(!isLiked)
    }
  }

  return (
    <div
      className="cursor-pointer"
      onClick={async () => await handleLike(id)}
    >
      {
        isLiked ?
          <Heart className="text-red-500" fill="red" />
          :
          <Heart />
      }
    </div>
  )
}
