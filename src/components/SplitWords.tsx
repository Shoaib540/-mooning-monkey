import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  highlight?: { word: string; node: ReactNode }[];
}

export default function SplitWords({ text, className = "", delay = 0, stagger = 0.05, as = "h1", highlight = [] }: Props) {
  const words = text.split(" ");
  const Tag = motion[as] as typeof motion.h1;

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => {
        const hl = highlight.find((h) => h.word === w);
        return (
          <span key={i} className="inline-block align-baseline pr-[0.25em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: 8, opacity: 0.35, filter: "blur(6px)" },
                show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] } },
              }}
            >
              {hl ? hl.node : w}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
