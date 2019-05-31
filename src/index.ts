declare var global: {
  window?: Window;
  document?: Document & {
    frames: {
      devicePixelRatio: number;
      screen: {
        deviceXDPI: number;
        systemXDPI: number;
      };
    };
  };
};

const zoomLevelDetector = (
  matchMedia: Window["matchMedia"],
  currentLevel: number,
  minimalLevel: number,
  stepDivisor: number
) => {
  while (
    currentLevel >= minimalLevel &&
    !matchMedia("(min-resolution: " + currentLevel / stepDivisor + "dppx)").matches
  ) {
    currentLevel--;
  }

  return currentLevel;
};

function calculatePageZoomLevel(): number {
  const mm = window.matchMedia;
  let startLevel = 10;
  let minLevel = 0.1;
  let stepDivisor = 1;
  let level;

  for (let i = 0; i < 4; i++) {
    level = 10 * zoomLevelDetector(mm, startLevel, minLevel, stepDivisor);

    startLevel = level + 9;
    minLevel = level;
    stepDivisor *= 10;
  }

  return level / stepDivisor;
}

function zoomLevel(): number {
  const window = global.window;
  if (!window) {
    return 1;
  }

  if (typeof window.devicePixelRatio !== "undefined") {
    return 1;
  }

  const document = global.document;
  if (!document) {
    return 1;
  }

  if (typeof document.frames !== "undefined") {
    if (typeof document.frames.devicePixelRatio !== "undefined") {
      return document.frames.devicePixelRatio;
    }

    return document.frames.screen.deviceXDPI / document.frames.screen.systemXDPI;
  }

  if (typeof window.matchMedia !== "undefined") {
    return calculatePageZoomLevel();
  }

  return 1;
}

function elementZoomLevel(element: HTMLElement, style?: CSSStyleDeclaration): number {
  style = style || getComputedStyle(element);

  // @ts-ignore
  return zoomLevel() * (parseFloat(style.zoom) || 1);
}

export { zoomLevel as default, elementZoomLevel, zoomLevel };
