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

function zoomLevelDetector(
  matchMedia: Window["matchMedia"],
  currentLevel: number,
  minimalLevel: number,
  stepDivisor: number
): number {
  while (
    currentLevel >= minimalLevel &&
    !matchMedia(`(min-resolution: ${currentLevel / stepDivisor}dppx)`).matches
  ) {
    currentLevel--;
  }

  return currentLevel;
}

function calculatePageZoomLevel(win: Window): number {
  const mm = win.matchMedia;
  let startLevel = 10;
  let minLevel = 0.1;
  let stepDivisor = 1;
  let level = startLevel;

  for (let i = 0; i < 4; i++) {
    level = 10 * zoomLevelDetector(mm, startLevel, minLevel, stepDivisor);

    startLevel = level + 9;
    minLevel = level;
    stepDivisor *= 10;
  }

  return level / stepDivisor;
}

/**
 * @description Return zoom multiplier of a window instance.
 *
 * @param win {Window} Window instance zoom level will be determined for. Useful
 * when needed to get zoom level of an iFrame
 */
export function zoomLevel(win: IECompatibleWindow = window): number {
  if (!win) {
    return 1;
  }

  // For IE11+ and any
  if (typeof win.devicePixelRatio !== "undefined") {
    return win.devicePixelRatio;
  }

  // For IE10
  const { frames } = win.document;
  if (typeof frames !== "undefined") {
    if (typeof frames.devicePixelRatio !== "undefined") {
      return frames.devicePixelRatio;
    }

    return frames.screen.deviceXDPI / frames.screen.systemXDPI;
  }

  // For any other browsers which does not support above
  if (typeof win.matchMedia !== "undefined") {
    return calculatePageZoomLevel(win);
  }

  // fallback otherwise
  return 1;
}

/**
 * @description Return reduced element's zoom level. Basically it multiplies
 * computed CSS zoom level of an element with  window's one
 *
 * @param elementOrStyles {Element | CSSStyleDeclaration} Can be element itself or
 * element's `getComputedStyle` call result
 * @param win {Window} parent window of an element (useful for iFrames)
 */
export function elementZoomLevel(
  elementOrStyles: Element | CSSStyleDeclaration,
  win?: IECompatibleWindow
): number {
  const zoom =
    ((elementOrStyles instanceof Element
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
        (getComputedStyle(elementOrStyles) as any).zoom
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
        (elementOrStyles as any).zoom) as string) || 1;

  return (
    zoomLevel(win) * (typeof zoom === "string" ? Number.parseFloat(zoom) : zoom)
  );
}
