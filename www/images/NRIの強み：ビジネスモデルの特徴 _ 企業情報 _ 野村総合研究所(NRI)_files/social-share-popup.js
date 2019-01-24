$(document).ready(function () {
    var networks = {
        Facebook: { width: 600, height: 450 },
        Twitter: { width: 600, height: 450 },
        LinkedIn: { width: 1000, height: 600 }
    };

    function getTopMargin(popupHeight) {
        return (screen.height / 2) - (popupHeight / 2);
    }

    function getLeftMargin(popupWidth) {
        return (screen.width / 2) - (popupWidth / 2);
    }

    function getPopupOptions(popupWidth, popupHeight) {
        var options = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,";
        return options + "top=" + getTopMargin(popupHeight) + ",left=" + getLeftMargin(popupWidth) + ",height=" + popupHeight + ",width=" + popupWidth;
    }

    function popup(network, href) {
        window.open(href, network, getPopupOptions(networks[network].width, networks[network].height));
    }

    $('.l-snsContents>li>a').click(function (e) {
        e.preventDefault();
        var $link = $(this);
        var href = $link.attr('href');
        var network = $link.find('img').attr('alt');
        popup(network, href);
    });
});
