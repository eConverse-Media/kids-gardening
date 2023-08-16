function handleTopTextLinks() {
    $('.top-text-links').prependTo('#MPOuterHeader > .col-md-12');
}

function handleSearch() {
    $('#searchColumn').prepend('<div class="search-wrap"><button type="button" class="search-btn-top" onclick="toggleSearch();" /></div>');
    $('.search-wrap').append($('.search-bar-top'));
    $('.search-bar-top .form-control').attr('placeholder', 'Type search terms');
    $(document).click(function (e) {
        var target = e.target,
            searchWrap = $('.search-wrap');

        if ($(target).is(searchWrap) ||
            !!($(target).closest(searchWrap).html())) {
                return;
            } else {
                closeSearch();
            }
    });
}

function toggleSearch() {
    $('.search-wrap').toggleClass('open');
    $('#MainCopy_ContentWrapper').toggleClass('search-open');
}

function closeSearch() {
    $('.search-wrap').removeClass('open');
    $('#MainCopy_ContentWrapper').removeClass('search-open');
}

function handleFundingOpportunities() {
    $('.funding-opportunities ul li, .featured-opportunities ul li').each(function () {
        // Grab href for each news item
        var self = $(this),
            title = $(self).find("h3"),
            href = $(self)
                .find("h3 a")
                .attr("href");

        // handle image
        var imgContainer = '<div class="img-container loading" />';
        $(self).wrapInner('<div class="text-container" />');
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

            $(self).find('.text-container > .title-row').append($(deadline));

        }

    });
}

function handleClickEvent(self) {
    var link = $(self).find('h3 a'),
        href = $(link).attr('href');

        $(self).click(function () {
            window.location.href = href;
        });
}

function handleResources() {

    
    $('.library-list > .col-md-12').each(function () {
        var self = $(this);

        handleClickEvent(self);

        // handle 'like' button

        var rating = $(self).find('.ItemRatingCommentPanel');

        $(rating).insertAfter($(self).find('.content-tags'));
        $(rating).wrap('<div class="tags-and-rating" />');
        
        // handle tags

        var tag = $(self).find('.label-search-tag[aria-label*="Type:"]:first-of-type')
        var klass = $(tag).text();

        klass = $.trim(klass);
        klass = klass.toLowerCase();
        klass = klass.replace(/\s/g, '-');
        klass = klass.replace(/\//g, '-');

        $(self).addClass(klass);

        $(tag).insertBefore($(self).find('.ItemRatingCommentPanel'));

    });

    // create carousel
    $('.featured-resources div[id*="ListViewContent"]').slick({
        dots: false,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: 'calc(50% - 600px)',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="fa-light fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="fa-light fa-arrow-right"></i></button>'
    });
}

function handleEvents() {

    
    $('.event-wrapper .HLEventList .Content ul:not(.dropdown-menu) li').each(function () {
        // handle click event
        var self = $(this);

        handleClickEvent(self);

        // handle event description

        var content = $(self).find('.title-row .col-md-9');
        
        $(content).wrapInner('<div class="event-desc" />');
        $(content).find('.event-desc > h3').insertBefore($(content).find('.event-desc'));
        $(content).find('.event-desc > *').insertAfter($(content).find('.event-desc'));

        // handle date blocks

        var month = $(self).find('.date-block .calendar-month span').text();

        month = month.substring(0, 3);
        $(self).find('.date-block .calendar-month').text(month);
    });

    // create carousel
    $('.event-wrapper .HLEventList .Content ul:not(.dropdown-menu').slick({
        dots: false,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: 'calc(50% - 600px)',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="fa-light fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="fa-light fa-arrow-right"></i></button>'
    });
}

function handleFeaturedOpportunities() {
    $('.featured-opportunities ul li').each(function () {
        var self = $(this),
            link = $(self).find('.showMoreLink');

        $(link).appendTo($(self).find('.text-container'));
    });
}

$(function () {
    handleTopTextLinks();
    handleSearch();
    handleFundingOpportunities();
    handleResources();
    handleEvents();
    handleFeaturedOpportunities();
});