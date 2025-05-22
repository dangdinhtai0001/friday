import {
  MCCollapsiable,
  MCCollapsibleContent,
  MCCollapsibleTrigger,
} from "@/components/atoms/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/organisms/sidebar2";

// Định nghĩa kiểu cho một Collapsible Item lồng nhau (nested)
// Cập nhật: nestedItems giờ sẽ là mảng các SidebarSubItem, cho phép lồng ghép không giới hạn
interface NestedCollapsibleItem {
  type: "collapsible";
  text: string;
  icon?: string | React.ReactNode;
  // Dùng Omit để loại bỏ type từ props, tránh gây vòng lặp kiểu
  // và dùng Partial để nestedItems không bắt buộc cho tất cả các SidebarSubItem
  nestedItems: SidebarSubItem[]; // <-- Thay đổi ở đây!
}

// Định nghĩa kiểu cho một Link Item
interface LinkItem {
  type: "link";
  text: string;
  link: string;
  icon?: string | React.ReactNode;
}

// Kiểu cho tất cả các mục con có thể là LinkItem hoặc NestedCollapsibleItem
export type SidebarSubItem = LinkItem | NestedCollapsibleItem; // Giữ nguyên

// Định nghĩa kiểu cho props của SidebarCollapsibleItem
interface SidebarCollapsibleItemProps {
  mainIcon: string; // Tên icon cho nút chính
  mainText: string; // Văn bản cho nút chính
  subItems: SidebarSubItem[]; // Mảng các mục con
}

interface SidebarSubItemRendererProps {
  item: SidebarSubItem;
}

function SidebarSubItemRenderer({ item }: SidebarSubItemRendererProps) {
  if (item.type === "link") {
    const linkItem = item as LinkItem; // Ép kiểu an toàn hơn với discriminated unions

    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          asChild
          className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
          text={linkItem.text}
          link={linkItem.link}
          icon={linkItem.icon}
        />
      </SidebarMenuSubItem>
    );
  } else if (item.type === "collapsible") {
    const collapsibleItem = item as NestedCollapsibleItem;

    return (
      <SidebarMenuSubItem>
        <MCCollapsiable className="w-full">
          <MCCollapsibleTrigger
            asChild
            className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
            iconPosition="start"
          >
            <SidebarMenuSubButton
              asChild
              icon={collapsibleItem.icon}
              text={collapsibleItem.text}
            />
          </MCCollapsibleTrigger>

          <MCCollapsibleContent className="px-1">
            <SidebarMenuSub className="gap-4">
              {collapsibleItem.nestedItems?.map((nestedItem, nestedIndex) => (
                // ĐỆ QUY Ở ĐÂY: Gọi lại SidebarSubItemRenderer cho mỗi mục con
                <SidebarSubItemRenderer key={nestedIndex} item={nestedItem} />
              ))}
            </SidebarMenuSub>
          </MCCollapsibleContent>
        </MCCollapsiable>
      </SidebarMenuSubItem>
    );
  }

  return null;
}

function SidebarCollapsibleItem({
  mainIcon,
  mainText,
  subItems,
}: SidebarCollapsibleItemProps) {
  return (
    <>
      <MCCollapsiable defaultOpen>
        <SidebarMenuItem className="flex flex-col items-start">
          <MCCollapsibleTrigger
            asChild
            className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
            iconPosition="start"
          >
            <SidebarMenuButton icon={mainIcon} text={mainText} />
          </MCCollapsibleTrigger>

          <MCCollapsibleContent className="px-1">
            <SidebarMenuSub className="gap-4">
              {subItems.map((item, index) => (
                <SidebarSubItemRenderer key={index} item={item} />
              ))}
            </SidebarMenuSub>
          </MCCollapsibleContent>
        </SidebarMenuItem>
      </MCCollapsiable>
    </>
  );
}

export default SidebarCollapsibleItem;
