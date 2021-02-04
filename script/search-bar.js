
$(function () {
    $('.search-bar-top').appendTo('#MPOuterHeader');
    $('.search-btn-top').appendTo('#MPOuterHeader #NAV .nav');
    $('.search-bar-top').prepend($('.search-bar-title'));
    $('.search-bar-top').prepend($('.search-close-btn'));
    $('.search-bar-top').hide();
    $('.search-btn-top').bind('click', function (e) {
        if ($('.search-bar-top button').is(e.target)) {
            return;
        } else if ($('.search-btn-top').is(e.target) ||
            $('.search-btn-top').is(e.target) ||
            $('.search-btn-top i').is(e.target)) {
            $('.search-bar-top').slideToggle('fast');
            $('.search-bar-top .form-control').focus();
        } else if (($('.search-bar-top').css('display') == 'block') &&
            !$('.SearchInputs .form-control').is(e.target)) {
            $('.search-bar-top').slideToggle('fast');
        } else {
            return;
        }
    });
    $('.search-bar-top .input-group input[id$="SearchTerm"]').attr('placeholder', 'Type search terms');

    $('.search-btn-top').bind('click', function () {
        if ($('.search-btn-top').hasClass('open')) {
            $('.search-btn-top').removeClass('open');
            $('body').removeClass('search-open');
        }
        else if (!$('.search-btn-top').hasClass('open')) {
            $('.search-btn-top').addClass('open');
            $('body').addClass('search-open');
        }
    });

});