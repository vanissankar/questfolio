import { createBrowserRouter } from "react-router-dom";
import StartScreen from "./pages/StartScreen/StartScreen";
import Game from "./pages/Game/Game";
import Portfolio from "./pages/Portfolio/Portfolio";

const router = createBrowserRouter([
  { path: "/", element: <StartScreen /> },
  { path: "/game", element: <Game /> },
  { path: "/portfolio", element: <Portfolio /> },
]);

export default router;
