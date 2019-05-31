<div align="center">
    <h1>zoom-level</h1>
    <p>
        <a href="https://www.npmjs.com/package/zoom-level"><img src="https://img.shields.io/badge/npm-zoom--level-brightgreen.svg" /></a>
        <a href="https://www.npmjs.com/package/zoom-level"><img src="https://img.shields.io/npm/v/zoom-level.svg" /></a>
        <a href="https://www.npmjs.com/package/zoom-level"><img src="https://img.shields.io/npm/dt/zoom-level.svg" /></a>
        <a href="https://www.codacy.com/app/xobotyi/zoom-level"><img src="https://api.codacy.com/project/badge/Grade/d9c7fa7e22c24e74b9c33e459a8eb774"/></a>
        <a href="https://www.npmjs.com/package/zoom-level"><img src="https://img.shields.io/npm/l/zoom-level.svg" /></a>
    </p>
    × <strong><a href="https://codesandbox.io/s/zoomlevel-live-example-841ns">LIVE EXAMPLE</a></strong> ×
</div>

## ABOUT

This plugin allows you to detect browser's and separate element's zoom level.

## INSTALLATION

```bash
npm install zoom-level
# or via yarn
yarn add zoom-level
```

## USAGE

```javascript
import zoomLevel from "zoom-level";

console.log(zoomLevel()); // 1;

window.addEventListener("resize", () => {
  console.log(zoomLevel()); // will return current browser's zoom level
});
```

Or, in case you want to detect separate element's zoom level (they can use own `zoom` CSS property which stacks with browser's one);

```javascript
import { elementZoomLevel } from "zoom-level";

const zoomedBlock = document.createElement("div");
zoomedBlock.style.zoom = 0.5;
zoomedBlock.style.width = "150px";
zoomedBlock.style.height = "150px";
zoomedBlock.style.margin = "32px";
zoomedBlock.style.padding = "32px";
zoomedBlock.style.background = "rgba(0,0,0,.05)";
zoomedBlock.innerText = "Lorem ipusm dolor sit amet";
document.appendChild(zoomedBlock);

console.log(elementZoomLevel(zoomedBlock)); // 0.5;

window.addEventListener("resize", () => {
  console.log(elementZoomLevel(zoomedBlock)); // if you zoom to 200% it'll be 1
});
```
