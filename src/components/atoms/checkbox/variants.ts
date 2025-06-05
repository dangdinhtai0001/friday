export const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.5, 1], // Phóng to hơn một chút rồi về bình thường
    opacity: [0, 1, 1],
  },
  exit: {
    scale: [1, 1.5, 0], // Phóng to hơn một chút rồi biến mất
    opacity: [1, 1, 0],
  },
};

export const iconTransition = {
  type: 'tween',
  duration: 0.3, // Thời gian animation
  ease: 'easeInOut', // Hàm easing cho chuyển động mượt mà
};
