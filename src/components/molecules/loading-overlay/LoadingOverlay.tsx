import React from 'react';
import type {LoadingOverlayProps} from './types'

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, text = 'Loading...' }) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-white text-lg font-bold">{text}</div>
    </div>
  );
};

export default LoadingOverlay;