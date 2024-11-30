import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersLanding from "./pages/UsersLanding";
import AdminLanding from "./pages/AdminLanding";
import UsersCheckGrade from "./pages/UsersCheckGrade";
import AdminSetting from "./pages/AdminSetting";
import AdminSetScores from "./pages/AdminSetScores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersLanding />,
    // recommended to add error element
  },
  {
    path: "/admin",
    element: <AdminLanding />,
  },
  {
    path: "/checkGrade",
    element: <UsersCheckGrade />,
  },
  {
    path: "/admin/setting",
    element: <AdminSetting />,
  },
  {
    path: "/admin/scores",
    element: <AdminSetScores />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
