import { useEffect, useRef, useState } from "react";
import "./SmoothScroll.css";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const data = useRef({
    ease: 0.08,
    current: 0,
    previous: 0,
    rounded: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (scrollingContainerRef.current) {
      document.body.style.height = `${scrollingContainerRef.current.getBoundingClientRect().height}px`;
    }
  }, [windowHeight]);

  useEffect(() => {
    let animationId: number;

    const smoothScrollingHandler = () => {
      if (!scrollingContainerRef.current) return;

      data.current.current = window.scrollY;
      data.current.previous += (data.current.current - data.current.previous) * data.current.ease;
      data.current.rounded = Math.round(data.current.previous * 100) / 100;

      scrollingContainerRef.current.style.transform = `translateY(-${data.current.previous}px)`;

      animationId = requestAnimationFrame(smoothScrollingHandler);
    };

    animationId = requestAnimationFrame(smoothScrollingHandler);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="smooth-scroll-parent">
      <div ref={scrollingContainerRef} className="smooth-scroll-container">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;

