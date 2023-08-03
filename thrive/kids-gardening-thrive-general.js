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

function handleFundingOpportunities() {
    $('.funding-opportunities ul li').each(function () {
        // Grab href for each news item
        var self = $(this),
            title = $(self).find("h3"),
            href = $(self)
                .find("h3 a")
                .attr("href");

        // handle image
        var imgContainer = '<div class="img-container loading" />';
        // $(self).wrapInner('<div class="text-container" />');
        $(self).prepend(imgContainer);
        //   Ajax Call for each news item
        $.ajax({
            url: href,
            dataType: "html",
            success: success
        });


        function success(resp) {
            //   Get Image for each news item

            if ($(resp).find('.blogs-block').length) {
                var img = $(resp).find('.blogs-block .col-md-12 img');
                var deadline = $(resp).find('.blogs-block .col-md-12 h5');
            }
            if ($(resp).find('div[id*="DetailPanel"]').length) {
                var img = $(resp).find(
                    'div[id*="DetailPanel"] .row:nth-child(2) .col-md-10 .col-md-12 img:first-of-type'
                );
            }

            if ($(img).attr('src') === undefined) {
                $(self).find(".img-container").addClass("no-image");
            }

            var src = $(img).attr("src"),
                //   Format for background inline style
                url = "url('" + src + "')";
         
            // Set each news image into respective img-containers
            $(self)
                .find(".img-container")
                .css("background-image", url);
            //   2 second timeout added to allow for ajax to load img
            setTimeout(function () {
                $(self)
                    .find(".img-container")
                    .removeClass("loading");
            }, 2000);

            $(self).find('.title-row').append($(deadline));

        }

    });
}

$(function () {
    handleEvents();
    handleFundingOpportunities();
});