import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import ProviderDetailsPage from "../pages/ProviderDetailsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import App from "../App";
import PublicLayout from "../layouts/PublicLayout";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/services",
            element: <ServicesPage />,
          },
          {
            path: "/providers/:providerId",
            element: <ProviderDetailsPage />,
          },
        ],
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;