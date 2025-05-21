// Define the types for the nested structure
type NavItem = {
  title: string;
  url: string;
};

type NavGroup = {
  title: string;
  url: string;
  items: NavItem[];
};

type NavMain = NavGroup[];

/**
 * Function to generate the navMain object
 */
export function getNavMain(): NavMain {
  return [
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
  ];
}
