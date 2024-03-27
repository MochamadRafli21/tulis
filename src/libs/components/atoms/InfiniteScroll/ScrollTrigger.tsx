"use client"
import { useScroll } from "./Context";
import { IntersectionContainer } from "@/libs/components/atoms";

export default function TriggerScroll({ children }: { children?: React.ReactNode }) {
  const { getMoreData, is_done } = useScroll();
  return <>
    {is_done ? '' :
      <IntersectionContainer onView={getMoreData}>
        {children}
      </IntersectionContainer>
    }
  </>;
}
