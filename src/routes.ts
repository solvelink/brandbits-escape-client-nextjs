import { createBrowserRouter, redirect } from "react-router";
import NotFound from "@/pages/NotFound";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import Invite from "./pages/Invite";
import InviteLink from "./pages/InviteLink";
import GameOnboarding from "./pages/game/Onboarding";
import GamePage from "./pages/game/Page";
import GameFinish from "./pages/game/Finish";
import GameRanking from "./pages/game/Ranking";
import CheckoutIndex from "./pages/checkout/CheckoutIndex";
import CheckoutInfo from "./pages/checkout/CheckoutInfo";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import { GameLayout } from "./components/layout/GameLayout";
import { CheckoutLayout } from "./components/layout/CheckoutLayout";

const router = createBrowserRouter([
  {
    path: "groep",
    loader: () => redirect("/invite"),
  },
  {
    path: "group",
    loader: () => redirect("/en/invite"),
  },
  {
    path: "gruppe",
    loader: () => redirect("/de/invite"),
  },
  {
    Component: DefaultLayout,
    path: "/:lang?",
    children: [
      {
        Component: CheckoutLayout,
        children: [
          {
            index: true,
            Component: CheckoutIndex,
          },
          {
            path: "info",
            Component: CheckoutInfo,
          },
          {
            path: "success",
            Component: CheckoutSuccess,
          },
          {
            path: "invite",
            Component: Invite,
          },
          {
            path: "invite/:code",
            Component: InviteLink,
          },
        ],
      },
      {
        path: "game",
        Component: GameLayout,
        children: [
          {
            path: ":page",
            Component: GamePage,
          },
          {
            path: "onboarding/:step",
            Component: GameOnboarding,
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
