import {
  MCDropdownMenu,
  MCDropdownMenuContent,
  MCDropdownMenuItem,
  MCDropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import {
  MCSidebarGroup,
  MCSidebarMenu,
  MCSidebarMenuButton,
  MCSidebarMenuItem,
} from "@/components/templates/sidebar";

const items = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Installation",
        url: "#",
      },
      {
        title: "Project Structure",
        url: "#",
      },
    ],
  },
  {
    title: "Building Your Application",
    url: "#",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
      },
      {
        title: "Rendering",
        url: "#",
      },
      {
        title: "Caching",
        url: "#",
      },
      {
        title: "Styling",
        url: "#",
      },
      {
        title: "Optimizing",
        url: "#",
      },
      {
        title: "Configuring",
        url: "#",
      },
      {
        title: "Testing",
        url: "#",
      },
      {
        title: "Authentication",
        url: "#",
      },
      {
        title: "Deploying",
        url: "#",
      },
      {
        title: "Upgrading",
        url: "#",
      },
      {
        title: "Examples",
        url: "#",
      },
    ],
  },
  {
    title: "API Reference",
    url: "#",
    items: [
      {
        title: "Components",
        url: "#",
      },
      {
        title: "File Conventions",
        url: "#",
      },
      {
        title: "Functions",
        url: "#",
      },
      {
        title: "next.config.js Options",
        url: "#",
      },
      {
        title: "CLI",
        url: "#",
      },
      {
        title: "Edge Runtime",
        url: "#",
      },
    ],
  },
  {
    title: "Architecture",
    url: "#",
    items: [
      {
        title: "Accessibility",
        url: "#",
      },
      {
        title: "Fast Refresh",
        url: "#",
      },
      {
        title: "Next.js Compiler",
        url: "#",
      },
      {
        title: "Supported Browsers",
        url: "#",
      },
      {
        title: "Turbopack",
        url: "#",
      },
    ],
  },
];

function SidebarMainNavigation() {
  return (
    <MCSidebarGroup>
      <MCSidebarMenu>
        {items.map((item, index) => (
          <MCDropdownMenu key={index}>
            <MCSidebarMenuItem>
              {/* -------------- */}
              <MCDropdownMenuTrigger asChild>
                <MCSidebarMenuButton className="flex w-full justify-start">
                  {item.title} --
                </MCSidebarMenuButton>
              </MCDropdownMenuTrigger>
              {/* -------------- */}
              {item.items?.length ? (
                <MCDropdownMenuContent
                  side="right"
                  align="start"
                  className="rounded-16 flex flex-col"
                >
                  {item.items.map((item2, index2) => (
                    <MCDropdownMenuItem asChild key={index2}>
                      <a href={item2.url}>{item2.title}</a>
                    </MCDropdownMenuItem>
                  ))}
                </MCDropdownMenuContent>
              ) : null}
            </MCSidebarMenuItem>
          </MCDropdownMenu>
        ))}
      </MCSidebarMenu>
    </MCSidebarGroup>
  );
}

export default SidebarMainNavigation;
