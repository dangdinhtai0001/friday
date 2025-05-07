import { Outlet } from "react-router";

function FallbackLayout() {
  return (
    <>
      <div>fallback layout nè</div>
      <Outlet />
    </>
  );
}

export default FallbackLayout;
