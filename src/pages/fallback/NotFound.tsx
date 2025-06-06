import Lottie from "react-lottie";
import animationData from "@/assets/lotties/dog-swimming-outlines.json";
import { Link } from "react-router";
import { ECButton } from "@/components/atoms/button";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-8">
        <div className="typography-semibold-48 text-black-100">
          Ối! Có vẻ bạn đã đi lạc rồi
        </div>
        <div className="typography-regular-20 text-black-100/80">
          Trang bạn đang tìm kiếm có thể đã được chuyển đi hoặc không còn tồn
          tại nữa.
        </div>
        <div className="h-16"/>
        <Link to="/" className="back-home-button">
          <ECButton variant="filled" size="medium">Về trang chủ</ECButton>
        </Link>
      </div>
      <div>
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
    </div>
  );
}

export default Page;
