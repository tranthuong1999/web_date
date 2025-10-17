
import { useState, useEffect, useRef, type RefObject } from "react";

export function useElementWidth(): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, width];
}
