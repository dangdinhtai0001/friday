'use client';

import { cn } from '@/composables/utils/shadcn';
import { motion, Variants } from 'motion/react';

const dotVariants: Variants = {
  jump: {
    y: -30,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
};
function LoadingThreeDotsJumping({ className }: { className?: string }) {
  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="flex items-center justify-center gap-8"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            'bg-black-80 h-16 w-16 rounded-full will-change-transform',
            className,
          )}
          variants={dotVariants}
        />
      ))}
      
    </motion.div>
  );
}

export default LoadingThreeDotsJumping;
