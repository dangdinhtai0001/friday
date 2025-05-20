```
src/
└── components/
    └── organisms/
        └── sidebar2/
            ├── index.ts              // Export tất cả các components từ đây
            ├── types.ts              // Định nghĩa các kiểu dữ liệu (types) cho Sidebar
            ├── constants.ts          // Định nghĩa các hằng số

            ├── context/              // Nhóm các tệp liên quan đến Context
            │   ├── SidebarContext.tsx    // Định nghĩa Context và hook useSidebarContext
            │   └── SidebarProvider.tsx   // Context Provider cho Sidebar

            ├── hooks/                // Chứa các custom hooks liên quan đến Sidebar
            │   └── use-sidebar-state.ts // Ví dụ: hook quản lý trạng thái sidebar
            │   └── use-sidebar-keyboard-shortcut.ts // Hook cho phím tắt

            ├── core/           // Đây sẽ là các thành phần "root" hoặc "layout" của Sidebar
            │   ├── Sidebar.tsx           // Component chính (cha) của Sidebar
            │   ├── SidebarInset.tsx      // Component cho phần nội dung chính bên cạnh Sidebar (nếu có)
            │   └── SidebarRail.tsx       // Component cho thanh ray kéo thả (nếu có)

            ├── ui/                   // Các thành phần UI nhỏ hơn, có thể tái sử dụng trong Sidebar
            │   ├── SidebarTrigger.tsx    // Nút điều khiển đóng/mở Sidebar
            │   ├── SidebarHeader.tsx     // Phần tiêu đề của Sidebar
            │   ├── SidebarContent.tsx    // Khu vực nội dung cuộn được
            │   ├── SidebarFooter.tsx     // Phần chân trang của Sidebar
            │   ├── SidebarInput.tsx      // Input tùy chỉnh cho Sidebar
            │   ├── SidebarSeparator.tsx  // Đường phân cách

            └── menu/                 // Nhóm các thành phần liên quan đến Menu trong Sidebar
                ├── SidebarMenu.tsx
                ├── SidebarMenuItem.tsx
                ├── SidebarMenuButton.tsx
                ├── SidebarMenuAction.tsx
                ├── SidebarMenuBadge.tsx
                ├── SidebarMenuSkeleton.tsx
                ├── SidebarMenuSub.tsx
                ├── SidebarMenuSubButton.tsx
                └── SidebarMenuSubItem.tsx
```

-----

## Chiến lược tách `sidebar.tsx` (Cập nhật)

Với cấu trúc mới này, chúng ta sẽ phân chia `sidebar.tsx` như sau:

1.  ### **`types.ts` và `constants.ts`**

      * Vẫn giữ nguyên vai trò của chúng là nơi tập trung các định nghĩa **kiểu dữ liệu** và **hằng số** dùng chung cho toàn bộ hệ thống Sidebar.

2.  ### **`context/SidebarContext.tsx` và `context/SidebarProvider.tsx`**

      * Các tệp này sẽ được di chuyển vào thư mục `context/`.
      * **`SidebarContext.tsx`**: Chứa `React.createContext` và `useSidebarContext` hook.
      * **`SidebarProvider.tsx`**: Chứa component `SidebarProvider`. Đây là nơi quản lý trạng thái chính của Sidebar (`open`, `openMobile`, `side`, `variant`, `collapsible`, `width`), tích hợp logic đọc/ghi cookie và cung cấp các hàm `setOpen`, `setOpenMobile`, `toggleSidebar`. Logic liên quan đến phím tắt cũng có thể được chuyển vào một hook riêng trong thư mục `hooks/`.

3.  ### **`hooks/`**

      * **`use-sidebar-state.ts`**: Thay vì quản lý cookie trực tiếp trong `SidebarProvider`, chúng ta có thể tạo một custom hook ở đây để xử lý việc đọc trạng thái ban đầu từ cookie và cập nhật cookie khi trạng thái `open` thay đổi. Điều này giúp `SidebarProvider` tập trung hơn vào việc cung cấp context.
      * **`use-sidebar-keyboard-shortcut.ts`**: Logic phím tắt `Ctrl/Cmd + B` hiện có trong `SidebarProvider` sẽ được tách ra thành một hook riêng ở đây. Hook này sẽ sử dụng `useSidebarContext` để gọi `toggleSidebar`.

4.  ### **`components/` (Core Sidebar Layout Components)**

      * **`Sidebar.tsx`**: Đây vẫn là component chính, đóng vai trò là container và quản lý logic render dựa trên `isMobile`, `collapsible`, `side`, và `variant`. Nó sẽ sử dụng `useSidebarContext` và bao bọc các thành phần con khác.
      * **`SidebarInset.tsx`**: Component `SidebarInset` sẽ được đặt ở đây, vì nó định nghĩa phần nội dung chính của ứng dụng mà Sidebar hoạt động cùng.
      * **`SidebarRail.tsx`**: Component `SidebarRail` (thanh kéo giãn Sidebar) cũng nằm trong nhóm này vì nó là một phần trực tiếp của layout Sidebar.

5.  ### **`ui/` (General UI Elements within Sidebar)**

      * Các thành phần UI cơ bản, có thể sử dụng ở nhiều nơi trong Sidebar nhưng không phải là một phần của cấu trúc Menu, sẽ được đặt ở đây.
      * **`SidebarTrigger.tsx`**: Nút để kích hoạt (toggle) Sidebar.
      * **`SidebarHeader.tsx`**: Phần đầu của Sidebar.
      * **`SidebarContent.tsx`**: Khu vực chứa nội dung chính có thể cuộn được của Sidebar.
      * **`SidebarFooter.tsx`**: Phần chân của Sidebar.
      * **`SidebarInput.tsx`**: Component `Input` được style đặc biệt cho Sidebar.
      * **`SidebarSeparator.tsx`**: Component `Separator` được style đặc biệt cho Sidebar.

6.  ### **`menu/` (Sidebar Menu Specific Components)**

      * Toàn bộ các component liên quan đến việc hiển thị danh sách các mục (menu items) và hành động của chúng sẽ được nhóm vào thư mục `menu/`. Điều này giúp cô lập logic và UI của menu.
      * **`SidebarMenu.tsx`**: Container cho danh sách menu.
      * **`SidebarMenuItem.tsx`**: Một mục trong danh sách menu.
      * **`SidebarMenuButton.tsx`**: Nút có thể click trong menu. Các `sidebarMenuButtonVariants` (từ `cva`) cũng sẽ nằm trong tệp này.
      * **`SidebarMenuAction.tsx`**: Nút hành động nhỏ bên cạnh mục menu.
      * **`SidebarMenuBadge.tsx`**: Huy hiệu hiển thị số lượng/thông báo.
      * **`SidebarMenuSkeleton.tsx`**: Trạng thái tải của các mục menu.
      * **`SidebarMenuSub.tsx`**: Container cho menu con (sub-menu).
      * **`SidebarMenuSubButton.tsx`**: Nút cho mục menu con.
      * **`SidebarMenuSubItem.tsx`**: Một mục trong menu con.

7.  ### **`index.ts`**

      * Vẫn là điểm xuất khẩu duy nhất để dễ dàng import tất cả các thành phần Sidebar.

Tuyệt vời! Tôi rất vui vì chúng ta đã thống nhất được cấu trúc thư mục. Việc đổi tên `components` thành `core` trong ngữ cảnh này hoàn toàn hợp lý, nó nhấn mạnh đây là các thành phần chính yếu tạo nên khung sườn của Sidebar.

---

## Thứ tự triển khai các tệp

Để đảm bảo quá trình phát triển diễn ra suôn sẻ và có hệ thống, chúng ta sẽ đi theo thứ tự sau đây, bắt đầu từ những phần nền tảng nhất:

1.  ### **`types.ts`**
    * **Mục đích:** Định nghĩa tất cả các kiểu dữ liệu và giao diện cần thiết cho Sidebar, bao gồm `SidebarState`, `SidebarActions`, `SidebarContextValue`, `SidebarRootProps`, và các props cho từng component con.
    * **Lý do ưu tiên:** Đây là nền tảng. Khi các kiểu dữ liệu đã được định nghĩa rõ ràng, chúng ta có thể sử dụng chúng để đảm bảo tính nhất quán và phát hiện lỗi sớm trong quá trình phát triển các tệp khác.

2.  ### **`constants.ts`**
    * **Mục đích:** Chứa tất cả các hằng số được sử dụng trong Sidebar, như kích thước, tên cookie, phím tắt.
    * **Lý do ưu tiên:** Các hằng số này sẽ được sử dụng trong nhiều tệp, việc định nghĩa chúng sớm giúp tránh lỗi chính tả và dễ dàng quản lý tập trung.

3.  ### **`context/SidebarContext.tsx`**
    * **Mục đích:** Tạo `React.createContext` và export `useSidebarContext` hook.
    * **Lý do ưu tiên:** Đây là nơi định nghĩa "cách" các component sẽ truy cập vào trạng thái Sidebar. Nó cần có mặt trước khi chúng ta viết `SidebarProvider` và các component con sử dụng context.

4.  ### **`hooks/use-sidebar-state.ts`**
    * **Mục đích:** Xử lý logic đọc trạng thái `open` ban đầu từ cookie và logic cập nhật cookie khi trạng thái thay đổi.
    * **Lý do ưu tiên:** Tách biệt logic quản lý trạng thái và tương tác với cookie ra một hook riêng, giúp `SidebarProvider` gọn gàng hơn. Hook này sẽ được sử dụng trong `SidebarProvider`.

5.  ### **`context/SidebarProvider.tsx`**
    * **Mục đích:** Quản lý trạng thái chính của Sidebar (`open`, `openMobile`, `side`, `variant`, `collapsible`, `width`), tích hợp `use-sidebar-state.ts` và cung cấp các hàm `setOpen`, `setOpenMobile`, `toggleSidebar` thông qua context.
    * **Lý do ưu tiên:** `SidebarProvider` là trái tim của hệ thống Sidebar, nó cung cấp trạng thái và hành động cho tất cả các component con. Nó cần được hoàn thành trước khi chúng ta bắt đầu xây dựng các UI component.

6.  ### **`hooks/use-sidebar-keyboard-shortcut.ts`**
    * **Mục đích:** Triển khai logic phím tắt `Ctrl/Cmd + B` để đóng/mở Sidebar bằng cách gọi `toggleSidebar` từ context.
    * **Lý do ưu tiên:** Hook này phụ thuộc vào `useSidebarContext`, nên cần `SidebarProvider` đã được định nghĩa.

7.  ### **`core/Sidebar.tsx`**
    * **Mục đích:** Component chính, đóng vai trò là container và quản lý logic render dựa trên `isMobile`, `collapsible`, `side`, và `variant`.
    * **Lý do ưu tiên:** Đây là component gốc mà các phần UI khác sẽ được lồng vào. Nó cần được thiết lập để có thể bắt đầu xây dựng các component con.

8.  ### **Các component trong `ui/` và `menu/` (Theo từng cặp hoặc nhóm chức năng)**
    * **Mục đích:** Triển khai từng UI component nhỏ hơn như `SidebarTrigger`, `SidebarHeader`, `SidebarMenuButton`, v.v.
    * **Lý do ưu tiên:** Chúng ta có thể làm việc với các component này song song hoặc theo từng nhóm nhỏ, vì chúng tương đối độc lập với nhau, chỉ phụ thuộc vào `useSidebarContext` và các props riêng của chúng.
        * **Gợi ý nhóm:**
            * **Nhóm cơ bản:** `SidebarTrigger.tsx`, `SidebarHeader.tsx`, `SidebarContent.tsx`, `SidebarFooter.tsx`, `SidebarSeparator.tsx`, `SidebarInput.tsx`.
            * **Nhóm Menu:** `SidebarMenu.tsx`, `SidebarMenuItem.tsx`, `SidebarMenuButton.tsx`, `SidebarMenuAction.tsx`, `SidebarMenuBadge.tsx`, `SidebarMenuSkeleton.tsx`, `SidebarMenuSub.tsx`, `SidebarMenuSubItem.tsx`, `SidebarMenuSubButton.tsx`.

9.  ### **`core/SidebarInset.tsx` và `core/SidebarRail.tsx`**
    * **Mục đích:** Hoàn thành các component layout chính của Sidebar.
    * **Lý do ưu tiên:** Các component này có thể được phát triển sau khi phần cốt lõi của Sidebar đã ổn định.

10. ### **`index.ts`**
    * **Mục đích:** Export tất cả các component và hook từ các tệp con để dễ dàng import ở các nơi khác trong ứng dụng.
    * **Lý do ưu tiên:** Đây là bước cuối cùng sau khi tất cả các thành phần đã được tạo ra.

---

Chúng ta sẽ bắt đầu với `types.ts`. Bạn đã sẵn sàng chưa?
