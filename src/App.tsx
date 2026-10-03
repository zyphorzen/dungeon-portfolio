import Scene from "./components/Scene";
import InteractionPrompt from "./interaction/InteractionPrompt";
import PortfolioPanel from "./portfolio/PortfolioPanel";
import HUD from "./ui/HUD";
import PauseMenu from "./ui/PauseMenu";
import LoadingScreen from "./ui/LoadingScreen";

export default function App() {
  return (
    <div className="relative h-screen w-screen">
      <Scene />
      <HUD />
      <InteractionPrompt />
      <PortfolioPanel />
      <PauseMenu />
      <LoadingScreen />
    </div>
  );
}
