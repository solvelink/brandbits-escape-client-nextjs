import { createBrowserRouter, redirect } from "react-router";
import NotFound from "@/pages/NotFound";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import Checkout from "./pages/Checkout";
import Invite from "./pages/Invite";
import GameOnboarding from "./pages/game/Onboarding";
import GamePage from "./pages/game/Page";
import GameFinish from "./pages/game/Finish";
import GameRanking from "./pages/game/Ranking";

// :lang?/

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: Checkout,
      },
      {
        path: "groep",
        loader: () => redirect("/invite"),
      },
      {
        path: "invite",
        Component: Invite,
      },
      {
        path: "game",
        children: [
          {
            path: "onboarding",
            Component: GameOnboarding,
          },
          {
            path: ":page",
            Component: GamePage,
          },
          {
            path: "finish",
            Component: GameFinish,
          },
          {
            path: "ranking",
            Component: GameRanking,
          },
        ],
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
