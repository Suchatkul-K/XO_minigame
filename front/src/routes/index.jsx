import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import OptionPage from "../pages/OptionPage";

const router = createBrowserRouter([
    {path: "/",
        element:(
            <LandingPage />
        )
    },
    {path: "/option",
        element:(
            <OptionPage />
        )
    }
])

export default function Router() {
    return <RouterProvider router={router} />;
  }