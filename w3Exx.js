function inject(){
    var searchEl,
	removeW3Schools = function () {
        // Search only on #search, for faster results:
        searchEl = document.getElementById('search');
        if (!searchEl) {
            searchEl = document.body;
        }
    
        // Why jQuery?
		var iterator = document.evaluate('//OL[@id="rso"]/li/div/h3/a[contains(@href,"w3schools")]/../../..', searchEl, null, XPathResult.ANY_TYPE, null)
 
		try {
			var thisNode = iterator.iterateNext();
			
			while (thisNode) {
				thisNode.parentNode.removeChild(thisNode);
				thisNode = iterator.iterateNext();
			} 
		}
		catch (e) {
			// Error: Document tree modified during iteration'
            setTimeout(removeW3Schools, 1500);
		}
        
        // Run the funcion again when the DOM changes:
        searchEl.removeEventListener('DOMNodeInserted');
        searchEl.addEventListener('DOMNodeInserted', throttle, false);
        searchEl.addEventListener('DOMNodeRemoved', throttle, false);
	},
    
    throttleTimer = null,
    throttle = function () {
        if ( throttleTimer ) {
            clearTimeout(throttleTimer);
        }
        throttleTimer = setTimeout(removeW3Schools, 500);
    };
    
    // Init on the load event and on script injection:
    window.addEventListener('load', throttle, false);
    throttle();
}


/* Inject the script:
 I personally prefer this way to gain access to a greater
 number of javascript functions
 but it can easily disabled, if you prefer. */

var s = document.createElement('script');
s.innerHTML = '~' + inject.toString() + '()';
(document.head||document.documentElement).appendChild(s);

