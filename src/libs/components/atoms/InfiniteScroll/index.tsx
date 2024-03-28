"use client"

import { useState } from "react";
import { ScrollContext } from "@/libs/components/atoms/InfiniteScroll/Context";
import TriggerScroll from "@/libs/components/atoms/InfiniteScroll/ScrollTrigger";

function InfiniteScroll({ currentPage, onUpdate, children }: {
  onUpdate?: (page: number) => Promise<boolean>,
  currentPage?: number,
  children?: React.ReactNode
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
  const ScrollContextValue = {
    is_done,
    getMoreData: loadMoreData
  }

  return (
    <ScrollContext.Provider value={ScrollContextValue}>
      {children}
    </ScrollContext.Provider>
  )

}

InfiniteScroll.Trigger = TriggerScroll

export default InfiniteScroll;
