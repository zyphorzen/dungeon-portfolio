import { lazy, Suspense } from "react";
import InteractionPrompt from "./interaction/InteractionPrompt";
import PortfolioPanel from "./portfolio/PortfolioPanel";
import HUD from "./ui/HUD";
import PauseMenu from "./ui/PauseMenu";
import LoadingScreen from "./ui/LoadingScreen";
import TouchControls from "./ui/TouchControls";
import FallbackPortfolio from "./ui/FallbackPortfolio";
import { useLite } from "./utils/device";

const Scene = lazy(() => import("./components/Scene"));

export default function App() {
  if (useLite) return <FallbackPortfolio />;

  return (
    <div className="relative h-[100dvh] w-screen">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <HUD />
      <TouchControls />
      <InteractionPrompt />
      <PortfolioPanel />
      <PauseMenu />
      <LoadingScreen />
    </div>
  );
}
