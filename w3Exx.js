var searchEl,
  performRemove = function () {
    if (searchEl) {
      searchEl.removeEventListener('DOMNodeInserted');
    }

    // Search only on #search, for faster results:
    searchEl = document.getElementById('search');
    if (!searchEl) {
      // If #search not found, search on body:
      searchEl = document.body;
    }

    // TODO: improve it to be more future-proof and faster:
    var iterator = document.evaluate('//OL[@id="rso"]/li/div/h3/a[contains(@href,"w3schools")]/../../..', searchEl, null, XPathResult.ANY_TYPE, null)

    try {
      var thisNode = iterator.iterateNext();

      while (thisNode) {
        thisNode.parentNode.removeChild(thisNode);
        thisNode = iterator.iterateNext();
      }
    } catch (e) {
      // Error: Document tree modified during iteration'
      setTimeout(performRemove, 1500);
    }

    // Run the funcion again when the DOM changes:
    searchEl.addEventListener('DOMNodeInserted', throttle, false);
    searchEl.addEventListener('DOMNodeRemoved', throttle, false);
  },

  throttleTimer = null,
  throttle = function () {
    if (throttleTimer) {
      clearTimeout(throttleTimer);
    }
    throttleTimer = setTimeout(performRemove, 500);
  };

// Init on the load event and on script injection:
window.addEventListener('load', throttle, false); throttle();
