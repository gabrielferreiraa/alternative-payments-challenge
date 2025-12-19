"use client";

import { useEffect, useRef } from "react";

const LOAD_MORE_TRIGGER_OFFSET = "100px";

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function InfiniteScrollTrigger({
  onIntersect,
  disabled = true,
  children,
}: InfiniteScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect();
      },
      {
        rootMargin: LOAD_MORE_TRIGGER_OFFSET,
      },
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [onIntersect, disabled]);

  return (
    <div ref={ref} className="flex w-full justify-center p-4">
      {children}
    </div>
  );
}
