import Lottie from 'react-lottie';
import { Options } from 'react-lottie';

interface LottieLoaderProps {
  options?: Options;
  height: number;
  width: number;
}

const defaultOptions: Options = {
  loop: true,
  autoplay: true,
  animationData: {},
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },    
};

function LottieLoader({
  options,
  height,
  width,
}: LottieLoaderProps) {
  return <Lottie options={{...defaultOptions, ...options}} height={height} width={width} />;
}

export default LottieLoader;
