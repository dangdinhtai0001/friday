import {
  ECBreadcrumb,
  ECBreadcrumbItem,
  ECBreadcrumbLink,
  ECBreadcrumbList,
  ECBreadcrumbPage,
  ECBreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { SidebarTrigger } from "@/components/organisms/sidebar";
import React from "react";
import { useAppLayoutContext } from "./context/app-layout-context";
import { Link, useMatches } from "react-router";
import { ECThemeSwitcher } from "@/components/molecules/theme-switcher";

function AppHeader() {
  const matches = useMatches(); // Sử dụng useMatches để lấy tất cả các route khớp

  const {
    actions: { setIsSidebarExpanded },
    state: { isSidebarExpanded, headerHeight },
  } = useAppLayoutContext();

  // Lọc và ánh xạ các route khớp thành các phần tử breadcrumb
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.breadcrumb)) // Chỉ lấy các route có định nghĩa breadcrumb trong handle
    .map((match) => {
      // Logic để hiển thị tên cho các tuyến đường động
      let breadcrumbText = match.handle.breadcrumb;
      // Ví dụ: Nếu đường dẫn là /products/:productId, hiển thị tên sản phẩm động
      // Bạn có thể cần một hàm helper hoặc gọi API để lấy tên sản phẩm thực tế
      if (match.pathname.includes("/products/") && match.params.productId) {
        // Đây là một ví dụ đơn giản. Trong ứng dụng thực tế, bạn có thể:
        // 1. Fetch tên sản phẩm dựa trên match.params.productId
        // 2. Truyền tên sản phẩm vào handle từ loader của route đó
        breadcrumbText = `Product: ${match.params.productId}`;
      } else if (match.params.someOtherId) {
        // Xử lý các tuyến đường động khác
        breadcrumbText = `Item: ${match.params.someOtherId}`;
      }
      // Bạn có thể thêm các logic phức tạp hơn ở đây nếu cần

      return {
        path: match.pathname,
        text: breadcrumbText,
        isCurrent: match.pathname === matches[matches.length - 1].pathname, // Kiểm tra xem đây có phải là route hiện tại không
      };
    });

  return (
    <div
      className="bg-background-2 sticky top-0 flex items-center gap-4 px-28 py-20 justify-between"
      style={{ height: headerHeight }}
    >
      <div className="flex items-center justify-start gap-4">
        <SidebarTrigger
          onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />

        <ECBreadcrumb>
          <ECBreadcrumbList className="gap-0">
            {/* Breadcrumb cho Home */}
            <ECBreadcrumbItem>
              <ECBreadcrumbLink className="text-black-40">
                <Link to={"/"}>Home</Link>
              </ECBreadcrumbLink>
            </ECBreadcrumbItem>

            {/* Các breadcrumb từ tuyến đường khớp */}
            {crumbs.map((crumb) => (
              <React.Fragment key={crumb.path}>
                <ECBreadcrumbSeparator />
                <ECBreadcrumbItem>
                  {crumb.isCurrent ? (
                    <ECBreadcrumbPage className="text-black-100">
                      {crumb.text}
                    </ECBreadcrumbPage>
                  ) : (
                    <ECBreadcrumbLink>
                      <Link to={crumb.path}>{crumb.text}</Link>
                    </ECBreadcrumbLink>
                  )}
                </ECBreadcrumbItem>
              </React.Fragment>
            ))}
          </ECBreadcrumbList>
        </ECBreadcrumb>
      </div>
      <div className="flex items-center justify-start gap-4">
        <ECThemeSwitcher />
      </div>
    </div>
  );
}

export default AppHeader;
