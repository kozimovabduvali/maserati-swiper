import { useEffect, useRef, useState } from "react";
import Slider from "./components/Slider";

function App() {
  const [switcher, setSwitcher] = useState<"exterior" | "interior">("exterior");
  const [activeSlider, setActiveSlider] = useState<"exterior" | "interior" | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isActiveSlider = (name: "exterior" | "interior") => name === switcher;

  const hasAnimated = (name: "exterior" | "interior") => {
    if (!hasMounted) return "";
    return activeSlider === name ? "animate-switch-slider" : "";
  };

  const handleSwitch = (target: "exterior" | "interior") => {
    if (target === switcher) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setSwitcher(target);
    setActiveSlider(switcher);

    timeoutRef.current = setTimeout(() => {
      setActiveSlider(null);
    }, 1350);
  };

  return (
    <div className="relative h-lvh w-full">
      <Slider
        name="exterior"
        className={`${isActiveSlider("exterior") ? "is-active" : ""} ${hasAnimated("exterior")}`}
      />
      <Slider
        name="interior"
        className={`${isActiveSlider("interior") ? "is-active" : ""} ${hasAnimated("interior")}`}
      />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white flex items-center gap-4 rounded z-30 p-4">
        <button type="button" onClick={() => handleSwitch("exterior")} className="uppercase cursor-pointer">
          <span className={`${switcher === "exterior" && "border-b"}`}>Exterior</span>
        </button>
        <button type="button" onClick={() => handleSwitch("interior")} className="uppercase cursor-pointer">
          <span className={`${switcher === "interior" && "border-b"}`}>Interior</span>
        </button>
      </div>
    </div>
  );
}

export default App;
