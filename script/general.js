setTimeout(function () {
    var headerHeight = $('#MPOuterHeader').css('height');
    $('#MPOuter').css('padding-top', headerHeight);
}, 500);

function handleContentTabs() {

    // Add class tabbed-content to the closest section to content items with the class tabs
    $('.tabs').closest('div[class*="section"]').addClass('tabbed-content');

    // Initialize and set counter that will be used to set unique id's and hrefs contecting tab nav items to tab content items
    var counter = 1;

    // Iterate over each HL section that has tabs to prepend bootstrap nav-tab markup
    $('.tabbed-content').each(function () {

        // Grab direct parent of tabs content items and add bootstrap tab markup to parent div
        var firstDiv = $('.tabs').parent();

        if (!$(firstDiv).hasClass('has-tab-nav')) {
            $(firstDiv).prepend('<div class="row-groups"><div class="container"><div class="row"><div class="col-md-12"><ul class="nav nav-tabs" role="tablist"></ul></div></div><div class="row"><div class="col-md-12"><div class="tab-content"></div></div></div></div></div>').addClass('has-tab-nav');;
        }

        var tabContent = $(this).find('.tab-content');

        var tabs = $(this).find('.tabs');

        // Iterate over each content item with the class tabs 
        $(tabs).each(function () {
            // Wrap tabs content item with tab markup and generated tab + counter id
            $(this).wrap('<div id="tab-' + counter + '" class="tab-pane" aria-labelledby="tab-' + counter + '" role="tabpanel" ></div>');

            // Add the tab content item with tab markup to tab-content div found in tabbed-content div
            $(tabContent).append($('#tab-' + counter));

            // travel up the dom from tabs content to closest tabbed-content div and then find the nav-tabs markup within tabbed content
            var navTabs = $(this).closest('.tabbed-content').find('.nav-tabs');
            // Add markup for nav tabs for each tabs content item with href matching the tab + counter id to allow tabs to work with tabs content
            $(navTabs).append('<li role="presentation"><a href="#tab-' + counter + '" aria-controls="all" role="tab" data-toggle="tab">FIRST TAB</a></li>');

            // Get tab title without additional add button text
            var tabTitle = $(this).find('.heading h2:first-of-type:not(a[id*="Add"]),  > h2:not(a[id*="Add"]), h2[id*="TitleText"]').clone().children().remove().end().text();
            // Replace FIRST TAB placeholder text with tab content item title
            $(this).find($('.nav-tabs a[href="#tab-' + counter + '"]').text(tabTitle));
            // Increase counter by 1 for next iteration of tabs content item id and href
            counter++;

        });

    });

    // Set first child of any tabbed content to active state to display on page load
    $('.tabbed-content .nav-tabs > li:first-of-type').addClass('active');

    $('.tabbed-content .tab-content > div.tab-pane:first-of-type').addClass('active');
}

function handleTopicType() {
    $('.tabs .SearchResults.HLLandingControl ul li').each(function () {
        var objectType = $(this).find('span[id*="lblObjectType"]').text();
        var objectTypeClass = objectType.toLowerCase();
        $(this).addClass(objectTypeClass);
    });
}

function handleSliderSyle() {
    $('.hero-slide').each(function () {
        var htmlContent = $(this).find('.HtmlContent');
        var heroImage = $(this).find('img');
        var heroImgSrc = $(this).find('img').attr('src');
        $(heroImage).hide();
        $(htmlContent).wrapInner('<div class="left-column"/>');
        $(htmlContent).append('<div class="right-column" ></div>');
        var rightColumn = $(this).find('.right-column');
        $(rightColumn).css('background-image', 'url("' + heroImgSrc + '")');
        $(this).find('em').unwrap();
        var h4 = $(this).find('h4');
        var em = $(this).find('em');
        $(em).wrapAll('<div class="button-slide-number"/>');
        var buttonSlideWrap = $(this).find('.button-slide-number');
        $(buttonSlideWrap).append($(h4));
    });
}

function handleByLines() {
    $('.home .tabs .SearchResults ul li').each(function () {
        var self = $(this);
        var contentTags = $(self).find('div[id*="pnlTags"]');
        var byline = $(self).find('.ByLine');
        var communityName = $(self).find('h5');
        var profileImg = $(self).find('div[id*="pnlProfPic"]');

        $(profileImg).appendTo(self);
        $(byline).appendTo(self);
        $(communityName).appendTo(self);
        $(contentTags).appendTo(self);
        $(self).append('<div class="byline-wrap"/>');

        var bylineWrap = $(self).find('.byline-wrap');

        $(bylineWrap).append(profileImg);
        $(bylineWrap).append(byline);
        $(bylineWrap).append(communityName);

    });

    $('.interior div:not(.featured):not(.filtered-grants) > div > .SearchResults.HLLandingControl ul li').each(function () {
        var self = $(this);
        var contentTags = $(self).find('div[id*="pnlTags"]');

        var byline = $(self).find('.ByLine');
        var communityName = $(self).find('h5');

        $(byline).appendTo(self);
        $(communityName).appendTo(self);
        $(byline + ',' + communityName).wrapAll('<div class="byline-wrap"/>');
        var byLine = $(this).find('.byline-wrap');

        $(contentTags).appendTo(self);
    });

    $('.latest-activity .HLDiscussions ul li').each(function () {
        var byline = $(this).find('.ByLine');
        var contentRow = $(this).find('> .row.content-row');
        var profileImg = $(this).find('div[id*="DiscussionList_Picture"]');
        $(contentRow).prepend($(byline));
        $(contentRow).prepend($(profileImg));

    });
}

function handleSiteFrame() {
    $('.siteframe-wrapper').wrapInner('<div class="siteframe"></div>');
}

$(function () {
    // Call handleContent Tabs Function
    handleContentTabs();
    handleByLines();
    handleTopicType();
    handleSiteFrame();

    // Adding button to the TTL
    $('#MPAuxNav ul').append($('.join-button'));

    // main slider

    $('.hero-slide').wrapAll($('<div class="hero-slider"/>'));

    $('.hero-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="fas fa-chevron-right"></i></button',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="fas fa-chevron-left"></i></button',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: true
                }
            }
        ]
    });

    handleSliderSyle();


    $('.HLWelcome .Welcome .btn-group').append('<span class="my-dashboard-button">My Dashboard</span>');

    // Search Bar JS
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