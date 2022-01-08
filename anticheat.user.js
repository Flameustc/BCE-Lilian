// ==UserScript==
// @name Preventing Console Cheats
// @namespace https://www.bondageprojects.com/
// @version 0.1
// @description prevent console cheats
// @author Sidious
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";
  function fromConsole() {
    let stack = "";
    try {
      /*
       * Throwing the error for Safari's sake, in Chrome and Firefox
       * var stack = new Error().stack; is sufficient.
       */
      throw new Error();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ({ stack } = e);
    }
    if (!stack) {
      return false;
    }

    const lines = stack.split("\n");
    // Chrome
    if (lines[lines.length - 1].indexOf("at <anonymous>:") >= 0) {
      return true;
    }
    for (let i = 0; i < lines.length; i++) {
      // Firefox
      if (lines[i].indexOf("@debugger eval code") >= 0) {
        return true;
      }
      // Safari (untested)
      if (lines[i].indexOf("_evaluateOn") >= 0) {
        return true;
      }
    }
    return false;
  }

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  Object.getOwnPropertyNames(window)
    .filter(
      (n) => !Object.prototype.hasOwnProperty.call(iframe.contentWindow, n)
    )
    .filter((n) => typeof window[n] === "function" && /^[A-Z]/u.test(n))
    .forEach((n) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const original = window[n];
      window[n] = function () {
        if (fromConsole()) {
          throw new Error("attempting to use console");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return original(...arguments);
      };
    });

  document.body.removeChild(iframe);
})();