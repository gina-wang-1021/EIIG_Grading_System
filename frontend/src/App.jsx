import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersLanding from "./pages/UsersLanding";
import AdminLanding from "./pages/AdminLanding";
import UsersCheckGrade from "./pages/UsersCheckGrade";

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
