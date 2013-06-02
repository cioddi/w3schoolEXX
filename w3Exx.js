// Why jQuery?
function inject(){
    var searchEl,
	removeW3Schools = function () {
        searchEl = document.getElementById('search');
    
        // But it is weird:
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
    
    // Init
    window.addEventListener('load', throttle, false);
    throttle();
}

var s = document.createElement('script');
s.innerHTML = '~' + inject.toString() + '()';
(document.head||document.documentElement).appendChild(s);

