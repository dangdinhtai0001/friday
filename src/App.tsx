import "@/assets/styles/main.css";
import { RouterProvider } from "react-router";
import { router } from "@/router";
import './i18n';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
