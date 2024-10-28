import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersLanding from "./users/UsersLanding";
import AdminLanding from "./admin/AdminLanding";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
