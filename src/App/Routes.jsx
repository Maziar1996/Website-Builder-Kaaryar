import { AdminDashboard } from "../Pages/AdminDashboard/AdminDashboard";
import { NotFoundPage } from "../Pages/NotFound/NotFoundPage";
import { PageEditor } from "../Pages/PageEditor/PageEditor";
import { PublicPage } from "../Pages/PublicPage/PublicPage";
import { Navigate } from "react-router-dom";

export const routes = [
  { path: "/", element: <Navigate to="/admin" replace /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/pages/:id", element: <PageEditor /> },
  { path: "/site", element: <PublicPage /> },
  { path: "/site/:slug", element: <PublicPage /> },
  { path: "/:slug", element: <PublicPage /> },
  { path: "*", element: <NotFoundPage /> },
];
