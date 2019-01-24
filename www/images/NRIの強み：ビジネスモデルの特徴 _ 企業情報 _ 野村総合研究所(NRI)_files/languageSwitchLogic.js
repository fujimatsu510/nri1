$(document).ready(function () {

    redirectUrlLanguage();

    //redirect user to url language by browser language
    function redirectUrlLanguage() {
        var domain = window.location.protocol + '//' + window.location.hostname + '/';
        var language = getBrowserLanguage();
        if (window.location.pathname.indexOf("/ja-jp/") > -1) {
            window.location.replace(window.location.href.replace("/ja-jp/", "/jp/"));
        }
        else if (window.location.pathname.indexOf("/en/") < 0
            && window.location.pathname.indexOf("/jp/") < 0
            && window.location.pathname !== "/"
            && window.location.pathname !== "/jp"
            && window.location.pathname !== "/en"
            && document.referrer.indexOf(window.location.hostname) < 0) {
            var newUrl = domain;
            newUrl += language + window.location.pathname;
            window.location.replace(newUrl);
        }
    }

    //get browser language
    function getBrowserLanguage() {
        var lang = navigator.language || navigator.userLanguage;
        return getLanguageCode(lang);
    }

    //get language code
    function getLanguageCode(language) {
        //IE11とかEdgeのブラウザ言語は[ja-JP]
        return language == "ja" || language == "ja-JP" ? "jp" : "en";
    }
});

