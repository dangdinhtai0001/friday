import React from 'react';
import type { LoadingOverlayProps } from './types'
import { Spinner } from '@/components/atoms/loader';

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, text = 'Loading...' }) => {
  if (!isLoading) return null;

  return (
    <div className="flex flex-col gap-2 absolute inset-0  items-center justify-center z-50 bg-gradient-to-t from-background-3/70 to-background-4/70 backdrop-blur-4">
      <Spinner className='h-24 w-24' />
      <div className="typography-regular-16">{text}</div>
    </div>
  );
};

export default LoadingOverlay;