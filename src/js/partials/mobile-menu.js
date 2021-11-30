module.exports = (function () {
    function init() {

        var menu = document.querySelector('.js_mobile-menu-wrapper');

        var setMobileMenuHeight = function setMobileMenuHeight() {
            menu.style.height = window.innerHeight + 'px';
        };

        window.addEventListener('DOMContentLoaded', setMobileMenuHeight);
        window.addEventListener('resize', setMobileMenuHeight);

        document.querySelector('.js_mobile-menu-open').addEventListener('click', function (e) {
            menu.classList.add('open');

        });

        document.querySelector('.js_mobile-menu-close').addEventListener('click', function (e) {
            closeMobileMenu();
        });

        var closeMobileMenu = function closeMobileMenu() {
            menu.querySelectorAll('.open').forEach(function (el) {
                el.classList.remove('open');
                el.classList.remove('overflow-hidden');
            });
            menu.classList.remove('open');
        };

        var openMobileSubMenu = function openMobileSubMenu(evt) {
            var menu_link = evt.target;
            var menu_sub = menu_link.closest('.js_parent-first-level').querySelector('.js_mobile-menu-second-level');
            menu_sub.classList.add('open');
            menu_sub.closest('.js_mobile-menu__body').classList.add('overflow-hidden');
        };

        var openMobileSubSubMenu = function openMobileSubSubMenu(evt) {
            var menu_link = evt.target;
            var menu_sub = menu_link.closest('.js_parent-second-level').querySelector('.js_mobile-menu-third-level');
            menu_sub.classList.add('open');
        };

        var closeMobileSubMenu = function closeMobileSubMenu(evt) {
            var menu_link = evt.target;
            var menu_sub = menu_link.closest('.js_mobile-menu-second-level');
            var menu_subSub = menu_link.closest('.js_mobile-menu-third-level');
            if(menu_subSub) {
                menu_subSub.classList.remove('open');
            } else {
                menu_sub.classList.remove('open');
                menu_sub.closest('.js_mobile-menu__body').classList.remove('overflow-hidden');
            }
        };

        document.querySelectorAll('.js_parent-first-level>a').forEach(function (open) {
            open.addEventListener('click', function (evt) {
                evt.preventDefault();
                openMobileSubMenu(evt);
            });
        });

        document.querySelectorAll('.js_parent-second-level>a').forEach(function (open) {
            open.addEventListener('click', function (evt) {
                evt.preventDefault();
                openMobileSubSubMenu(evt);
            });
        });

        document.querySelectorAll('.js_sub-menu-close>a').forEach(function (open) {
            open.addEventListener('click', function (evt) {
                evt.preventDefault();
                closeMobileSubMenu(evt);
            });
        });

        var closeMobileMenuByOuterClick = function closeMobileMenuByOuterClick(e) {
            var menuOpen = document.querySelector('.js_mobile-menu-wrapper.open');
            var btnOpen = document.querySelector('.js_mobile-menu-open');
            if (menuOpen && !menuOpen.contains(e.target) && !btnOpen.contains(e.target)) {
                closeMobileMenu();
            }
        }

        document.addEventListener('click', closeMobileMenuByOuterClick);

    }

    return {
        init
    }
}());
