import { useEffect, useState, useRef } from 'react';

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const position = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      dotPosition.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Check for hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(isHoverable);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Smooth follow for outer ring
      position.current.x += (targetPosition.current.x - position.current.x) * 0.15;
      position.current.y += (targetPosition.current.y - position.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x - 20}px, ${position.current.y - 20}px) scale(${isHovering ? 1.5 : isClicking ? 0.8 : 1})`;
      }
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotPosition.current.x - 4}px, ${dotPosition.current.y - 4}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible, isHovering, isClicking]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          width: 40,
          height: 40,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease, transform 0.15s ease',
        }}
      >
        <div 
          className={`w-full h-full rounded-full border-2 transition-all duration-200 ${
            isHovering 
              ? 'border-[#ff5005] bg-[#ff5005]/10' 
              : 'border-white/80'
          }`}
        />
      </div>
      
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className={`w-full h-full rounded-full transition-all duration-200 ${
          isHovering ? 'bg-[#ff5005]' : 'bg-white'
        }`} />
      </div>
      
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default SmoothCursor;

