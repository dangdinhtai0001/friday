import React from 'react';
import Lottie from 'react-lottie';

interface LottieViewerProps {
  animationData: object; // Đường dẫn đến file JSON Lottie
  height?: number; // Chiều cao của animation
  width?: number; // Chiều rộng của animation
}

const LottieViewer: React.FC<LottieViewerProps> = ({ animationData, height = 400, width = 400 }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
      />
    </div>
  );
};

export default LottieViewer;