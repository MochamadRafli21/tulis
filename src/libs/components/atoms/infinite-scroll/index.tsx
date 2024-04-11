"use client"

import { useState } from "react";
import { ScrollContext } from "@/libs/components/atoms/infinite-scroll/scroll-context";
import TriggerScroll from "@/libs/components/atoms/infinite-scroll/scroll-trigger";

function InfiniteScroll({ currentPage, onUpdate, children }: {
  onUpdate?: (page: number) => Promise<boolean>,
  currentPage?: number,
  children?: React.ReactNode,
  forceState?: boolean
}) {
  const [is_done, setDone] = useState(false);
  const [page, setPage] = useState(currentPage ?? 1);

  const loadMoreData = async () => {
    if (onUpdate) {
      const isDataFinal = await onUpdate(page)
      if (isDataFinal) {
        setDone(true)
        return
      }
    }
    setPage(page + 1)
  }

  const reset = () => {
    setDone(false)
    setPage(1)
  }



  const ScrollContextValue = {
    is_done,
    getMoreData: loadMoreData,
    reset
  }

  return (
    <ScrollContext.Provider value={ScrollContextValue}>
      {children}
    </ScrollContext.Provider>
  )

}

InfiniteScroll.Trigger = TriggerScroll

export default InfiniteScroll;
