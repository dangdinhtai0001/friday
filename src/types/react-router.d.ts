import { RouteObject as OriginalRouteObject } from "react-router-dom";

interface RouteMetadata {
  breadcrumb?: string| boolean;
  icon?: string | React.ReactNode;
}

interface RouteObject extends OriginalRouteObject {
  handle?: RouteMetadata;
  children?: RouteObject[]; 
}
