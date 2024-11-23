import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersLanding from "./users/UsersLanding";
import AdminLanding from "./admin/AdminLanding";
import UsersCheckGrade from "./users/UsersCheckGrade";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
