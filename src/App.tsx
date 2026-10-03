import Scene from "./components/Scene";
import InteractionPrompt from "./interaction/InteractionPrompt";

export default function App() {
  return (
    <div className="relative h-screen w-screen">
      <Scene />
      <InteractionPrompt />
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-amber-200/70">
        Klik untuk kontrol mouse • WASD gerak • Shift lari • E interaksi
      </p>
    </div>
  );
}
