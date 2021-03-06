(function(){
    'use strict';
    angular.module('app-NA', ['ngResource'])
    .factory('loading', loading)
    .factory('ads', ads);
    
    /* Funções */
    function ads() {
        var c = angular.isUndefined(window.googletag);
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];

        if(c){
            window.gads = document.createElement('script');
            window.gads.async = true;
            window.gads.type = 'text/javascript';
            window.useSSL = 'https:' == document.location.protocol;
            window.gads.src = (window.useSSL ? 'https:' : 'http:') +
              '//www.googletagservices.com/tag/js/gpt.js';
            window.node = document.getElementsByTagName('script')[0];
            window.node.parentNode.insertBefore(window.gads, window.node);
        }
        
        return {
            setAdsDiv: setAdsDiv
        }
        
        function setAdsDiv(id){
            window.googletag.cmd.push(function() {
            window.googletag.defineSlot('/1028927/NA_Capa_retangulo_300x250', [300, 250], id).addService(googletag.pubads());
            window.googletag.pubads().enableSingleRequest();
            window.googletag.enableServices();
          });
        }
    }
    
    function loading($timeout) {
        
        var lg = {}, keys = {37: 1, 38: 1, 39: 1, 40: 1};
        lg.$loading = $('.loading');
        lg.setLoagind = setLoading;
        lg.start = start;
        lg.complete = complete;
        
        window.lgStart = start;
        window.lgComplete = complete;
        return lg;
        
        function setLoading($elem){
            lg.$loading = $($elem);
            return true;
        }
        
        function start(){
            _toTop();
            disableScroll();
            lg.$loading.fadeIn(800)
        }
        
        function complete(){
            lg.$loading.fadeOut(400);
            enableScroll();
        }
        
        function disableScroll() {
          if (window.addEventListener) // older FF
              window.addEventListener('DOMMouseScroll', preventDefault, false);
          window.onwheel = preventDefault; // modern standard
          window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
          window.ontouchmove  = preventDefault; // mobile
          document.onkeydown  = preventDefaultForScrollKeys;
        }

        function enableScroll() {
            if (window.removeEventListener)
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.onmousewheel = document.onmousewheel = null; 
            window.onwheel = null; 
            window.ontouchmove = null;  
            document.onkeydown = null;  
        }
        
        
        function preventDefault(e) {
          e = e || window.event;
          if (e.preventDefault)
              e.preventDefault();
          e.returnValue = false;  
        }

        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }
        
        function _toTop(){
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
            return true;
        }
    }
    
})();