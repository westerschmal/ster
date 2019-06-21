var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

var options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 0.5
};

var ObserverCallback = function(entries, observer) {
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].intersectionRatio >= 0.50) {
            if (!adCalled)
                doConsent();
        }
    }
};

var polyfillCallback = function() {
    var observer = new IntersectionObserver(ObserverCallback, options);
    var target = document.querySelector('#sterad');
    observer.observe(target);
};

var adCalled = false;

function doConsent() {
    googletag.cmd.push(function() {
        googletag.pubads().refresh();
    });
    adCalled = true;
}

var polyfillScript = document.createElement('script');
polyfillScript.type = 'text/javascript';
polyfillScript.crossorigin = 'anonymous';
polyfillScript.src = 'https://polyfill.io/v3/polyfill.min.js?callback=polyfillCallback&flags=gated&features=default%2CIntersectionObserver';
polyfillScript.async = true;

var head = document.getElementsByTagName('head')[0];
head.insertBefore(polyfillScript, head.firstChild);

(function() {

    var adslot = '/9233/Teletekst/Pagina100_199(Nieuws)';
    var adsizes = [[468,60],[320,50],[728,90],[300,600],[120,600],[160,600]] ;
    var adid = 'sterad';
    var bottomSlot = null

    function insertSterHeader() {
        var addiv = document.getElementById(adid);
        addiv.insertAdjacentHTML('beforebegin', '<div class="ster-header"><style>.ster-header { display: none; text-align: center }</style>Advertentie door <a target = "_blank" href="https://www.ster.nl">Ster.nl</a></div>');
    }

    prepareGoogle();

    function prepareGoogle() {

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
        script.async = true;

        var head = document.getElementsByTagName('head')[0];

        head.insertBefore(script, head.firstChild);

        googletag.cmd.push(function() {
            bottomSlot = googletag.defineSlot(adslot, adsizes, adid).addService(googletag.pubads());
            var mapping = googletag.sizeMapping().addSize([0,0],[[320,50]]).addSize([600,0],[[468,60]]).addSize([800,0],[[728,90]]).addSize([1200,0],[[120,600],[160,600],[300,600]]).build();
            bottomSlot.defineSizeMapping(mapping);
            bottomSlot.setCollapseEmptyDiv(true);
            googletag.pubads().disableInitialLoad();
            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                if (!event.isEmpty && event.slot == bottomSlot) {
                    insertSterHeader();
                }
            });
            googletag.enableServices();
            googletag.display(adid); try { window.addEventListener("hashchange", updateSterAd, false); function updateSterAd() { googletag.pubads().refresh([bottomSlot]); } }catch (err) { } //doesn't actually display until refresh() is called

        });
    }
}());
