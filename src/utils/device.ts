export const isTouch =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

export const isLowEnd = isTouch || (navigator.hardwareConcurrency ?? 8) <= 4;

function checkWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export const useLite =
  !checkWebGL() || new URLSearchParams(location.search).has("lite");
