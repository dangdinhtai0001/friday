## Giải thích Component `Sidebar.tsx`

Component `Sidebar.tsx` là trái tim của hệ thống sidebar trên giao diện người dùng. Nó chịu trách nhiệm chính trong việc:

* **Xử lý hiển thị responsive:** Tự động chuyển đổi giữa chế độ mobile (sử dụng `Sheet` của Shadcn UI) và desktop.
* **Quản lý các biến thể hiển thị:** Cho phép bạn xác định cách sidebar xuất hiện và tương tác với nội dung chính của ứng dụng.
* **Kết nối với Sidebar Context:** Lấy trạng thái và hành động từ `useSidebarContext` để điều khiển hành vi của nó.

### Các thuộc tính chính cần hiểu

Component `Sidebar` nhận các props sau để tùy chỉnh giao diện và hành vi:

* `side`: Vị trí của sidebar (`"left"` hoặc `"right"`).
* `variant`: Cách sidebar tương tác với layout chính (`"sidebar"`, `"floating"`, `"inset"`).
* `collapsible`: Cách sidebar thu gọn/mở rộng (`"offcanvas"`, `"icon"`, `"none"`).
* `className`: Lớp CSS bổ sung để tùy chỉnh kiểu dáng.
* `children`: Các component con được render bên trong sidebar (ví dụ: `SidebarHeader`, `SidebarContent`, `SidebarMenu`).

---

### Giải thích chi tiết các thuộc tính

#### 1. `side` (`"left"` | `"right"`)

Thuộc tính này xác định vị trí của sidebar trên màn hình.

* **`side="left"` (Mặc định):** Sidebar sẽ xuất hiện ở bên trái của giao diện người dùng. Đây là bố cục phổ biến nhất.
* **`side="right"`:** Sidebar sẽ xuất hiện ở bên phải của giao diện người dùng. Hữu ích cho các sidebar chức năng phụ hoặc thông tin bổ sung.

**Cách nó ảnh hưởng đến CSS:**
Trong mã của bạn, thuộc tính `side` được sử dụng để điều khiển các lớp CSS như `left-0` hoặc `right-0` và logic biến đổi (ví dụ: `group-data-[side=right]:rotate-180` trên `sidebar-gap`) để định vị và căn chỉnh sidebar khi nó cố định.

#### 2. `variant` (`"sidebar"` | `"floating"` | `"inset"`)

Thuộc tính `variant` xác định cách sidebar tích hợp vào bố cục tổng thể của ứng dụng trên desktop. Đây là một thuộc tính quan trọng để điều chỉnh trải nghiệm người dùng.

* **`variant="sidebar"` (Mặc định):** Đây là biến thể truyền thống nhất.
    * Sidebar chiếm một phần không gian cố định trên màn hình (được xác định bởi `expandedWidth` hoặc `collapsedWidth`).
    * **Nội dung chính của ứng dụng sẽ bị đẩy sang một bên** để nhường chỗ cho sidebar.
    * Khi sidebar thu gọn (`collapsed`), chiều rộng của nó sẽ giảm xuống và nội dung chính sẽ dịch chuyển để lấp đầy khoảng trống.
    * **Cách nhận biết trong code:** `data-variant="sidebar"`

* **`variant="floating"`:** Sidebar sẽ xuất hiện **trên cùng** của nội dung chính của ứng dụng, không đẩy nội dung.
    * Nó thường có bóng đổ (`shadow-sm`) và bo góc (`rounded-lg`) để tạo cảm giác "nổi".
    * Khi sidebar mở, nó sẽ che phủ một phần nội dung chính.
    * Thích hợp cho các thanh điều hướng tạm thời hoặc menu overlay.
    * **Cách nhận biết trong code:** `data-variant="floating"`
    * Lớp CSS: `group-data-[variant=floating]:border group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm`

* **`variant="inset"`:** Biến thể này tương tự như `sidebar` nhưng thường được dùng khi nội dung chính của bạn cũng có các thuộc tính bo góc hoặc margin xung quanh, tạo cảm giác sidebar "lồng vào" nội dung chính.
    * Nó vẫn chiếm không gian và đẩy nội dung.
    * Thường đi kèm với các margin và bo góc trên `SidebarInset` để tạo hiệu ứng thị giác.
    * **Cách nhận biết trong code:** `data-variant="inset"`
    * Lớp CSS trên `SidebarInset`: `md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm`

#### 3. `collapsible` (`"offcanvas"` | `"icon"` | `"none"`)

Thuộc tính `collapsible` xác định hành vi của sidebar khi nó thu gọn (collapsed).

* **`collapsible="offcanvas"`:** Khi sidebar thu gọn, nó sẽ **hoàn toàn trượt ra khỏi màn hình** và không còn hiển thị nữa. Nội dung chính sẽ chiếm toàn bộ chiều rộng.
    * Thích hợp cho các ứng dụng muốn tối đa hóa không gian màn hình khi sidebar không cần thiết.
    * **Cách nhận biết trong code:** `data-collapsible="offcanvas"`
    * Lớp CSS: `group-data-[collapsible=offcanvas]:w-0` (trên `sidebar-gap`) và `group-data-[collapsible=offcanvas]:left-[calc(${expandedWidth}*-1)]` (trên `sidebar-container`).

* **`collapsible="icon"` (Mặc định):** Khi sidebar thu gọn, nó sẽ chỉ hiển thị một phiên bản thu nhỏ (thường là chỉ các icon) của các mục menu, vẫn chiếm một chiều rộng nhỏ trên màn hình (được xác định bởi `collapsedWidth`).
    * Nội dung chính của ứng dụng vẫn bị đẩy sang một bên bởi chiều rộng thu gọn này.
    * Đây là lựa chọn phổ biến để giữ lại một phần nhận diện của sidebar và cho phép truy cập nhanh các icon.
    * **Cách nhận biết trong code:** `data-collapsible="icon"`
    * Lớp CSS: `group-data-[collapsible=icon]:w-[${collapsedWidth}]` (trên `sidebar-gap` và `sidebar-container`).

* **`collapsible="none"`:** Sidebar **không thể thu gọn**. Nó sẽ luôn hiển thị ở trạng thái mở rộng (`expandedWidth`).
    * Thích hợp cho các ứng dụng có sidebar luôn hiển thị và không cần tùy chọn thu gọn.
    * Bạn có thể thấy một `if (collapsible === "none")` block riêng biệt ở đầu component `Sidebar.tsx` để xử lý trường hợp này, vì nó không cần logic chuyển đổi phức tạp.

---

### Cách tùy chỉnh `Sidebar.tsx`

1.  **Thay đổi giá trị mặc định:**
    Nếu bạn muốn một hành vi hoặc kiểu dáng mặc định khác cho toàn bộ ứng dụng, bạn có thể thay đổi giá trị mặc định của `side`, `variant`, `collapsible` trực tiếp trong component `Sidebar.tsx` hoặc trong `SidebarProvider.tsx` (nơi các props này được truyền xuống).

2.  **Chỉnh sửa CSS:**
    Các lớp Tailwind CSS hiện có trong `Sidebar.tsx` sử dụng cú pháp `group-data-[attribute=value]:` để áp dụng kiểu dáng dựa trên các thuộc tính `data-state`, `data-collapsible`, `data-variant`, và `data-side` mà component `Sidebar` đặt trên chính nó.
    * Bạn có thể chỉnh sửa các lớp này để thay đổi màu sắc, kích thước, hiệu ứng chuyển động, hoặc bố cục.
    * Ví dụ: nếu bạn muốn tăng tốc độ chuyển động, bạn có thể chỉnh sửa `duration-200` thành `duration-300` hoặc `duration-500`.

3.  **Thay đổi logic Responsive:**
    Phần `if (isMobile)` sử dụng `MCSheet` (có lẽ là một wrapper của Sheet từ Shadcn UI). Bạn có thể tùy chỉnh:
    * Cách `MCSheet` hiển thị (ví dụ: `side`, `className` của `MCSheetContent`).
    * Nội dung bên trong `MCSheetHeader` cho mobile (hiện tại là `sr-only`).

4.  **Điều chỉnh khoảng trống Sidebar (`sidebar-gap`):**
    Phần tử `data-slot="sidebar-gap"` là một `div` trong suốt có nhiệm vụ tạo ra khoảng trống trên nội dung chính, tương ứng với chiều rộng của sidebar khi nó ở chế độ `variant="sidebar"` hoặc `variant="inset"`. Nếu bạn muốn thay đổi cách sidebar "đẩy" nội dung, bạn sẽ cần điều chỉnh `width` và các lớp CSS liên quan đến `group-data-[collapsible]` trên phần tử này.

5.  **Thêm hiệu ứng hoặc thành phần mới:**
    Bạn có thể thêm các hiệu ứng chuyển động (`transition`) hoặc các phần tử DOM mới bên trong `Sidebar.tsx` để đạt được giao diện mong muốn. Tuy nhiên, hãy cẩn thận để không làm hỏng logic hiện có liên quan đến `data-` attributes.

Tóm lại, `Sidebar.tsx` là nơi bạn định hình hành vi và giao diện cốt lõi của sidebar. Bằng cách điều chỉnh các props `variant`, `collapsible`, và `side`, bạn có thể tạo ra nhiều trải nghiệm người dùng khác nhau.