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

function zoomLevel(win?: IECompatibleWindow): number {
  win = win || window;
  if (typeof win.devicePixelRatio !== "undefined") {
    return win.devicePixelRatio;
  }

  if (typeof win.document.frames !== "undefined") {
    if (typeof win.document.frames.devicePixelRatio !== "undefined") {
      return win.document.frames.devicePixelRatio;
    }

    return win.document.frames.screen.deviceXDPI / win.document.frames.screen.systemXDPI;
  }

  if (typeof win.matchMedia !== "undefined") {
    return calculatePageZoomLevel();
  }

  return 1;
}

function elementZoomLevel(element: HTMLElement, elementStyles?: CSSStyleDeclaration, win?: IECompatibleWindow): number {
  win = win || window;

  elementStyles = elementStyles || getComputedStyle(element);

  // @ts-ignore
  return zoomLevel(win) * (parseFloat(elementStyles.zoom) || 1);
}

export { zoomLevel as default, elementZoomLevel, zoomLevel };
