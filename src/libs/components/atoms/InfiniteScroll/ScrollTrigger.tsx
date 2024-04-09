"use client"
import { useScroll } from "./Context";
import { IntersectionContainer } from "@/libs/components/atoms";
import { useImperativeHandle, ForwardedRef, forwardRef } from "react";

const TriggerScroll = forwardRef(
  function TriggerScroll(
    { children }: { children?: React.ReactNode },
    ref?: ForwardedRef<{ resetScroll: () => void }>
  ) {
    const { getMoreData, is_done, reset } = useScroll();

    useImperativeHandle(ref, () => ({
      resetScroll() {
        console.log("reset")
        reset()
      }
    }), [reset]);


    return <>
      {
        is_done ? null :
          <IntersectionContainer onView={getMoreData}>
            {children}
          </IntersectionContainer>
      }
    </>;
  })

export default TriggerScroll

