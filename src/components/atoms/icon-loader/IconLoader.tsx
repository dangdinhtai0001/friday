import { cn } from "@/composables/lib/utils";

const allIconFiles = import.meta.glob("@/assets/icons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Chuyển đổi object trả về thành dạng dễ sử dụng hơn
const icons: { [key: string]: string } = {};
for (const [path, content] of Object.entries(allIconFiles)) {
  // Lấy tên file từ đường dẫn
  const fileName = path.split("/").pop()?.replace(".svg", "") || "";
  if (fileName) {
    icons[fileName] = content as string;
  }
}

interface IconLoaderProps {
  name: string;
  className?: string;
}

const IconLoader = ({ name, className }: IconLoaderProps) => {
  const iconContent = icons[name];

  if (!iconContent) {
    console.warn(`SVG file with name "${name}" not found.`);
    return null;
  }

  return (
    <div
      className={cn("h-16 w-16", className)}
      dangerouslySetInnerHTML={{ __html: iconContent }}
    />
  );
};

export default IconLoader;
