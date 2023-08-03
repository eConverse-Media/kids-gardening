function handleEvents() {
    $('.HLEventList  div[id*="ContentPanel"] > .col-md-12 ul:not(.dropdown-menu) li').each(function () {
        var dateThumbnail = $(this).find('.date-block');
        var h3Anchor = $(this).find('h3 a');
        var h3AnchorHref = $(h3Anchor).attr('href');
        $(this).wrap('<a href="' + h3AnchorHref + '"></a>');
        $(this).prepend('<div class="img-container"/>');
        var imgContainer = $(this).find('.img-container');
        var eventImage = $(this).find('.title-row .col-md-3 img');
        var eventImageSrc = $(eventImage).attr('src');
        $(imgContainer).css('background-image', 'url("' + eventImageSrc + '")');
        $(imgContainer).prepend($(dateThumbnail));
    });

    $('.event-wrapper .HLEventList div[id*="ContentPanel"] > .col-md-12 ul:not(.dropdown-menu)').slick({
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: 'calc(50% - 585px)',
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="fas fa-chevron-right"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="fas fa-chevron-left"></i></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '65px'
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    centerPadding: '0px'
                }
            }
        ]
    });

    $('.event-wrapper .HLEventList ul li').each(function () {
        var eventInfodiv = $(this).find('.col-md-10 .title-row .col-md-9');
        $(eventInfodiv).contents().filter(function () { return this.nodeType === 3 }).wrap('<div class="event-description"></div>');

        var date = $(this).find($('.timeAgoFormat'));
        $(eventInfodiv).append($(date));
    });
}

$(function () {
    handleEvents();
});