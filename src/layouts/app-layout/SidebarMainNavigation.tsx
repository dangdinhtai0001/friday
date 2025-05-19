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
} from "@/components/organisms/sidebar";
import SidebarItemContent from "./SidebarItemContent";
import { motion } from "motion/react";

const items = [
  {
    title: "Getting Started",
    url: "#",
    icon: "rocket",
    tooltip: "Getting Started",
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
    icon: "apps",
    tooltip: "Building Your Application",
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

export type SidebarMainNavigationProps = {
  isSidebarExpanded: boolean;
};

function SidebarMainNavigation({
  isSidebarExpanded,
}: SidebarMainNavigationProps) {
  return (
    <MCSidebarGroup>
      <MCSidebarMenu>
        {items.map((item, index) => (
          <MCDropdownMenu key={index}>
            <MCSidebarMenuItem>
              {/* -------------- */}
              <MCDropdownMenuTrigger asChild className="">
                <MCSidebarMenuButton
                  className="flex w-full items-center justify-start gap-8"
                  tooltip={isSidebarExpanded ? undefined : item.tooltip}
                >
                  <SidebarItemContent
                    icon={item.icon}
                    title={item.title}
                    isExpanded={isSidebarExpanded}
                  />
                </MCSidebarMenuButton>
              </MCDropdownMenuTrigger>
              {/* -------------- */}
              {item.items?.length ? (
                <MCDropdownMenuContent
                  side="right"
                  align="start"
                  sideOffset={16}
                  className="rounded-16 flex flex-col"
                >
                  {item.items.map((item2, index2) => (
                    <MCDropdownMenuItem asChild key={index2}>
                      <motion.div
                        whileHover={{x: 8}}
                        transition={{type: "spring", stiffness: 300, damping: 20}}
                      >
                        <a href={item2.url}>{item2.title}</a>
                      </motion.div>
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
