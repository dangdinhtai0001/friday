import { Spinner } from "@/components/atoms/loader";

export interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
}

function LoadingOverlay({
  isLoading,
  text = "Loading...",
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="from-background-3/70 to-background-4/70 backdrop-blur-4 absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-gradient-to-t">
      <Spinner className="h-24 w-24" />
      <div className="typography-regular-16">{text}</div>
    </div>
  );
}

export default LoadingOverlay;
