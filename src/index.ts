type IECompatibleWindow = Window & {
  document: Document & {
    frames?: {
      devicePixelRatio: number;
      screen: {
        deviceXDPI: number;
        systemXDPI: number;
      };
    };
  };
};

declare var global: {
  window?: IECompatibleWindow;
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

const calculatePageZoomLevel = (win: Window): number => {
  const mm = win.matchMedia;
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
};

function zoomLevel(win?: IECompatibleWindow): number {
  win = win || global.window;

  if (!win) {
    return 1;
  }

  if (typeof win.devicePixelRatio !== "undefined") {
    return win.devicePixelRatio;
  }

  const frames = win.document.frames;
  if (typeof frames !== "undefined") {
    if (typeof frames.devicePixelRatio !== "undefined") {
      return frames.devicePixelRatio;
    }

    return frames.screen.deviceXDPI / frames.screen.systemXDPI;
  }

  if (typeof win.matchMedia !== "undefined") {
    return calculatePageZoomLevel(win);
  }

  return 1;
}

function elementZoomLevel(element: HTMLElement, elementStyles?: CSSStyleDeclaration, win?: IECompatibleWindow): number {
  elementStyles = elementStyles || getComputedStyle(element);

  // @ts-ignore
  return zoomLevel(win) * (parseFloat(elementStyles.zoom) || 1);
}

export { zoomLevel as default, zoomLevel, elementZoomLevel };
