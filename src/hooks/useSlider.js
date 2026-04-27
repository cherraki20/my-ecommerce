import { useCallback, useEffect, useState } from "react";

export function useSlider(length, intervalMs = 4000) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next) => {
      if (length <= 0) return;
      const normalized = ((next % length) + length) % length;
      setIndex(normalized);
    },
    [length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (length <= 1) return undefined;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [length, intervalMs]);

  return { index, goTo, next, prev };
}
