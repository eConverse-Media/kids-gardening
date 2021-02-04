$(function () {

    // Community List 

    $('.popular-communities .community-list').each(function () {
        var href = $(this).find('h3 a').attr('href');
        $(this).wrap('<a href="' + href + '" />');
    });

    // Handle Library Lists 

    $('.featured-resources > div >  .row > .col-md-12').each(function () {
        $(this).contents().filter(function () { return this.nodeType === 3 }).wrap('<h2 class="TitleText"></h2>');
    });

    $('.featured-resources .library-list').each(function () {
        var img = $(this).find('div[id*="NameBlock"] div:nth-child(4) img');
        var imgSrc = $(img).attr('src');
        $(this).prepend('<div class="img-container"/>');
        var imgContainer = $(this).find('.img-container');
        $(imgContainer).css('background-image', 'url("' + imgSrc + '")');
        var rating = $(this).find('.ItemRatingCommentPanel');
        $(imgContainer).prepend(rating);
        var socialTags = $(this).find('.user-content-hashtag');
        $(imgContainer).prepend($(socialTags));
        var h3Anchor = $(this).find('h3 a');
        var h3AnchorHref = $(h3Anchor).attr('href');
        $(this).wrap('<a href="' + h3AnchorHref + '"></a>');
    });

    // handle most active members
    $('.home .featured-resources div[id*="ListViewContent"]').slick({
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        centerMode: true,
        slidesToShow: 4,
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

    // Adding Featured Resources button

    $('.featured-resources h2.TitleText').append($('.featured-resources .Content .col-md-8 .form-inline'));

    $('.featured-resources').append($('.featured-resource-button'));

    // Events

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

    $('.home .HLEventList div[id*="ContentPanel"] > .col-md-12 ul:not(.dropdown-menu)').slick({
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


    $('.partner-slide').wrapAll('<div class="partner-slider" />');

    $('.partner-slide').each(function () {
        var href = $(this).find('a').attr('href');
        $(this).wrap('<a href="' + href + '"/>');
    });

    $('.partner-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: 'calc(50% - 600px)',
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

    // Handle Library Lists 

    $('.home .HLEventList ul li').each(function () {
        var eventInfodiv = $(this).find('.col-md-10 .title-row .col-md-9');
        $(eventInfodiv).contents().filter(function () { return this.nodeType === 3 }).wrap('<div class="event-description"></div>');

        var date = $(this).find($('.timeAgoFormat'));
        $(eventInfodiv).append($(date));
    });

    // Add Event Button to Event widget title

    $('.home .HLEventList .heading h2').append($('.add-event-button'));

    // Truncate Month Thumbnails
    $('.home .HLLandingControl.HLEventList ul li').each(function () {
        var self = $(this),
            month = $(self).find('.date-block .calendar-month span').text();

        month = month.substring(0, 3);
        $(self).find('.date-block .calendar-month').text(month);
    });

    // Popular Communities

    $('.popular-communities h2').append($('.communities-button'));

    // Suggested Communities
    $('.people-you-should-know h2.TitleText').append($('.suggested-contacts-buttons'));

    // Ad Space 

    $('.ad-space').each(function () {
        var htmlContent = $(this).find('.HtmlContent');
        var img = $(this).find('img');
        var imgSrc = $(this).find($(img)).attr('src');
        $(htmlContent).css('background-image', 'url("' + imgSrc + '")');
        $(img).hide();
    });
});