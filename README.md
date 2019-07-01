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
It is [lightweight](https://bundlephobia.com/result?p=zoom-level) and has **no dependencies**!

## INSTALLATION

```bash
npm install zoom-level
# or via yarn
yarn add zoom-level
```

**INSTALLATION NOTE:**  
This lib is written in ES6+ and delivering with both, transpiled and untranspiled versions:

- `main` field of `package.json` is pointing to transpiled ES3-compatible version with CJS modules resolution;
- `module` field is pointing to transpiled ES3-compatible version with ES modules resolution;
- `esnext` field is pointing to the ES6+ version with ES modules resolution;

Depending on your targets you may have to use [Webpack](https://webpack.js.org/) and/or
[Babel](http://babeljs.io/) to pull untranspiled version of package.  
See some tips on wiring thing up: [https://2ality.com/2017/06/pkg-esnext.html](https://2ality.com/2017/06/pkg-esnext.html)

## USAGE

```javascript
import zoomLevel from "zoom-level";

zoomLevel(); // 1;

window.addEventListener("resize", () => {
  zoomLevel(); // will return current browser's zoom level
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

elementZoomLevel(zoomedBlock); // 0.5;

window.addEventListener("resize", () => {
  elementZoomLevel(zoomedBlock); // if you zoom to 200% it'll be 1
});
```

## TESTS

Sadly i have no idea how to manage testing of this package, due to there is no known ways to control browser's zoom level.  
If you know how to do it - please let me know.
