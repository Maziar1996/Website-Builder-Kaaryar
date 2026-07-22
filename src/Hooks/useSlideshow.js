import { useState, useEffect, useRef, useCallback } from "react";

export default function useSlideshow(
  length,
  { initialIndex = 0, direction = "forward", intervalMs = 3000 } = {},
) {
  const safeInitial = length > 0 ? initialIndex % length : 0;
  const [currentIndex, setCurrentIndex] = useState(safeInitial);
  const timerRef = useRef(null);

  useEffect(() => {
    if (length > 0 && currentIndex >= length) {
      setCurrentIndex(0);
    }
  }, [length, currentIndex]);

  const step = useCallback(
    (delta) => {
      if (length <= 0) return;
      setCurrentIndex((prev) => (prev + delta + length) % length);
    },
    [length],
  );

  const next = useCallback(
    () => step(direction === "forward" ? 1 : -1),
    [step, direction],
  );
  const prev = useCallback(
    () => step(direction === "forward" ? -1 : 1),
    [step, direction],
  );

  const goTo = useCallback(
    (index) => {
      if (length <= 0) return;
      setCurrentIndex(((index % length) + length) % length);
    },
    [length],
  );

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (length <= 1) return;
    timerRef.current = setInterval(next, intervalMs);
  }, [length, next, intervalMs]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const manualNext = useCallback(() => {
    next();
    restartTimer();
  }, [next, restartTimer]);

  const manualPrev = useCallback(() => {
    prev();
    restartTimer();
  }, [prev, restartTimer]);

  const manualGoTo = useCallback(
    (index) => {
      goTo(index);
      restartTimer();
    },
    [goTo, restartTimer],
  );

  return {
    currentIndex,
    next: manualNext,
    prev: manualPrev,
    goTo: manualGoTo,
  };
}
