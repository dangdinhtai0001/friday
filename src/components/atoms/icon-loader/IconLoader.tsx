import { cn } from "@/composables/utils/shadcn";

const allIconFiles = import.meta.glob("@/assets/icons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Convert the returned object into a more usable format
const icons: { [key: string]: string } = {};
for (const [path, content] of Object.entries(allIconFiles)) {
  // Extract the file name from the path
  const fileName = path.split("/").pop()?.replace(".svg", "") || "";
  if (fileName) {
    icons[fileName] = content as string;
  }
}

interface IconLoaderProps {
  name: string; // The name of the icon to load
  className?: string; // Optional CSS class for styling
}

const IconLoader = ({ name, className }: IconLoaderProps) => {
  const iconContent = icons[name];

  if (!iconContent) {
    console.warn(`SVG file with name "${name}" not found.`);
    return null;
  }

  return (
    <div
      className={cn("icon-loader h-16 w-16 text-center flex", className)}
      dangerouslySetInnerHTML={{ __html: iconContent }}
    />
  );
};

export default IconLoader;
