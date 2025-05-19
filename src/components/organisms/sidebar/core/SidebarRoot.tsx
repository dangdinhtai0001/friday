import SidebarProvider from "../context/SidebarProvider";
import { SidebarRootProps } from "../sidebar.type";

function SidebarRoot({
  children,
  ...props
}: React.PropsWithChildren<SidebarRootProps>) {
  return <SidebarProvider {...props}>{children}</SidebarProvider>;
}

export default SidebarRoot;
