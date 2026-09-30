import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Image that drifts slightly inside its frame while the page scrolls.
 * Size the frame with className (e.g. "aspect-[4/5] rounded-xl").
 * Motion is disabled when the user prefers reduced motion.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 28,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={reduced ? {} : { y }}
        className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
      />
    </div>
  );
}