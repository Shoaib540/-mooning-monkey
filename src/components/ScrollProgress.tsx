import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: w }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan origin-left"
    />
  );
}
