import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user?<Home />: <Register />,
    },
    {
      path: "/login",
      element: user?<Home />: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile/:profileId",
      element: <Profile />,
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;