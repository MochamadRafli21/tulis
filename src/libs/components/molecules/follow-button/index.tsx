"use client"

import { Button } from "@/libs/components/atoms"
import { updateMyFollow } from "@/app/actions/user"
import { useState } from "react"
export const FollowBtn = ({ id, is_following }: { id: string, is_following: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(is_following)
  const handleFollow = async (id: string) => {
    const success = await updateMyFollow(id)
    if (success != null) {
      setIsFollowing(!isFollowing)
    }
  }

  return (
    <Button size={'sm'} variant={isFollowing ? "bordered" : "primary"}
      onClick={async () => await handleFollow(id)}
    >
      {isFollowing ? "Followed" : "Follow"}
    </Button>
  )
}
