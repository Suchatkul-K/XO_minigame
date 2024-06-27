import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import OptionPage from "../pages/OptionPage";
import Layout from "../components/Layout";
import GamePage from "../pages/GamePage";
import ReplayPage from "../pages/ReplayPage";

const router = createBrowserRouter([
    {path: "/",
        element:(
            <Layout />
        ),
        children: [
            {index: true,
                element:(
                    <LandingPage />
                )
            },
            {path: "option",
                element:(
                    <OptionPage />
                )
            },
            {path: "game/:x/:y/:rule/:type",
                element:(
                    <GamePage />
                )
            },
            {path: "replay/:id",
                element:(
                    <ReplayPage />
                )
            },
        ]
    }
])

export default function Router() {
    return <RouterProvider router={router} />;
  }