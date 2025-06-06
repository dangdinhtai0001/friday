import { ECLottieLoader } from "@/components/atoms/lottie-loader";
import animationData from "@/assets/lotties/plane-animation.json";

function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ECLottieLoader
        options={{ animationData: animationData }}
        height={600}
        width={600}
      />
    </div>
  );
}

export default Page;
