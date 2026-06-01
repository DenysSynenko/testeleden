import { useEffect, useRef, Children, ReactNode } from "react";

interface Props {
  children: ReactNode;
  mdCols?: 2 | 3;
  autoScroll?: boolean;
  className?: string;
}

const MobileCarousel = ({ children, mdCols = 3, autoScroll = true, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll) return;
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (mq.matches) return;

    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { setTimeout(() => (paused = false), 2500); };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("pointerdown", pause);

    const id = window.setInterval(() => {
      if (paused || !el) return;
      const max = el.scrollWidth - el.clientWidth;
      const step = el.clientWidth * 0.88;
      const next = el.scrollLeft + step;
      el.scrollTo({ left: next > max - 8 ? 0 : next, behavior: "smooth" });
    }, 4200);

    return () => {
      clearInterval(id);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("pointerdown", pause);
    };
  }, [autoScroll]);

  const gridCols = mdCols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div
      ref={ref}
      className={`flex md:grid ${gridCols} gap-5 md:gap-6 lg:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 md:mx-0 px-6 md:px-0 pb-6 md:pb-0 scrollbar-hide scroll-smooth ${className}`}
    >
      {Children.map(children, (child, i) => (
        <div
          key={i}
          className="snap-center shrink-0 w-[86%] sm:w-[65%] md:w-auto md:shrink flex [&>*]:w-full"
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default MobileCarousel;