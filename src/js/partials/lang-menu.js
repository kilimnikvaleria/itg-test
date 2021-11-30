module.exports = (function () {
    function init() {

        var langList = document.querySelector('.js_lang-menu-list');

        document.querySelector('.js_lang-menu-toggle').addEventListener('click', function (e) {
            langList.classList.toggle('show');
            });

        var closeLangMenuByOuterClick = function closeLangMenuByOuterClick(e) {
            var langListShow = document.querySelector('.js_lang-menu-list.show');
            var lang = document.querySelector('.js_lang-menu');

            if (langListShow && !lang.contains(e.target)) {
                langListShow.classList.remove('show');
            }
        };

        document.addEventListener('click', closeLangMenuByOuterClick);

    }

    return {
        init
    }
}());
