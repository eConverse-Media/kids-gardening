function handleGroups() {
    $('.groups-btn').insertAfter('.popular-groups .pagination');
}

function handleBottomSlider() {
    // handle slide images
    $('.bottom-slide').each(function () {
        var self = $(this),
            img = $(self).find('img'),
            htmlContent = $(self).find('.HtmlContent');

        $(img).insertBefore(htmlContent);
        $(img).wrap('<div class="img-container" />');

        $(self).find('p:empty').remove();
    });

    // create carousel
    $('.bottom-carousel > .col-md-12').slick({
        dots: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="fa-light fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="fa-light fa-arrow-right"></i></button>'
    });

}

function handlePartnerCarousel() {
    $('.partners > .col-md-12').slick({
        dots: false,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: 'calc(50% - 600px)',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="fa-light fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="fa-light fa-arrow-right"></i></button>'
    })
}

function handleHeroSlider() {

    // handle slides

    var heroSlides = $('.hero-slide').toArray(),
        count = heroSlides.length;

    for (var i = 0; i < count; i++) {

        // handle slide number
        var currSlide = heroSlides[i],
            slideNum = i + 1;

        $(currSlide).find('.HtmlContent').prepend('<p><strong>' + slideNum + '/' + count + '</strong></p>');

        // handle image

        var img = $(currSlide).find('img');

        $(img).unwrap();
        $(currSlide).prepend('<div class="img-container" />');

        handleBgImage(currSlide, $(currSlide).find('.img-container'));
        $(img).remove();
    }

    // create carousel

    $('.hero-slide').wrapAll('<div class="hero-slider slick-dotted" />');
    $('.hero-slider').slick({
        arrows: true,
        dots: false,
        fade: true,
        infinite: true,
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="fa-light fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="fa-light fa-arrow-right"></i></button>'
    });

}

$(function () {
    handleGroups();
    handleBottomSlider();
    handlePartnerCarousel();
    handleHeroSlider();
});