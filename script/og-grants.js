var filterText = [],
    gridItems = [];

$(function () {


    //  Featured Grants JS
    $(".featured.grants ul li").each(function () {
        // Grab href for each news item
        var self = $(this),
            title = $(self).find("h3"),
            href = $(self)
                .find("h3 a")
                .attr("href");

        // handle image
        var imgContainer = '<div class="img-container loading" />';
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

            // Adding image for event feed
            if ($(resp).find('.event-picture').length) {
                var img = $(resp).find(
                    '.event-picture img:first-of-type'
                );
            }
            // Adding an Image for discussions
            if ($(resp).find('div[id*="threadNav"]').length) {
                var img = $(resp).find(
                    '.threadViewDetailsContainer .MessageListContainer ul li:first-child  div[id*="pnlMessage"] img:first-of-type'
                );
            }

            // Adding the Item Rating 

            var likes = $(resp).find('.ItemRatingCommentPanel div[id*="likeRatingContainer"] a:first-of-type').text();

            // Adding the Hashtags 

            var tags = $(resp).find('.blogs-block .user-content-hashtag');


            if ($(img).attr('src') === undefined) {
                $(self).find(".img-container").addClass("no-image");
            }

            var src = $(img).attr("src"),
                //   Format for background inline style
                url = "url('" + src + "')";
            var externalLink = $(resp).find('a[id$="URL"]').attr('href');

            if (externalLink === undefined) {
                externalLink = href;
            }
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

            $(self).append($(deadline));

            $(self).append($('<span class="likes-display">' + likes + '</span>'));

            $(self).prepend($(tags));

        }

    });

    // handle filtered grants entries
    $('.filtered-grants .SearchResults.HLLandingControl ul li').each(function () {
        var self = $(this),
            title = $(self).find("h3"),
            href = $(self)
                .find("h3 a")
                .attr("href");

        // handle image
        var imgContainer = '<div class="img-container loading" />';
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

            // Adding image for event feed
            if ($(resp).find('.event-picture').length) {
                var img = $(resp).find(
                    '.event-picture img:first-of-type'
                );
            }
            // Adding an Image for discussions
            if ($(resp).find('div[id*="threadNav"]').length) {
                var img = $(resp).find(
                    '.threadViewDetailsContainer .MessageListContainer ul li:first-child  div[id*="pnlMessage"] img:first-of-type'
                );
            }

            // Adding the Item Rating 

            var likes = $(resp).find('.ItemRatingCommentPanel div[id*="likeRatingContainer"] a:first-of-type').text();

            // Adding the Hashtags 

            var tags = $(resp).find('.blogs-block .user-content-hashtag');

            if ($(img).attr('src') === undefined) {
                $(self).find(".img-container").addClass("no-image");
            }

            var src = $(img).attr("src"),
                //   Format for background inline style
                url = "url('" + src + "')";
            var externalLink = $(resp).find('a[id$="URL"]').attr('href');

            if (externalLink === undefined) {
                externalLink = href;
            }
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


            $(self).append($(deadline));


            $(self).append($('<span class="likes-display">' + likes + '</span>'));

            $(self).prepend($(tags));

        }

        var tags = $(self).find('a.label-search-tag').toArray();
        $(self).addClass('iso');
        if (tags.length) {
            for (var i = 0; i < tags.length; i++) {
                var tag = $(tags[i])
                    .attr("data-tag")
                    .toLowerCase();
                tag = tag.replace(/\s+/g, "-");
                $(self).addClass(tag);
            }
        }
    });
    // handle filtering
    $('.filtered-grants .SearchResults.HLLandingControl').prepend('<div class="dropdown-group"><div class="HtmlContent"></div></div>');

    makinFilters();

    // add 'Filter by' text

    $('<div class="filter-text">Sort by</div>').prependTo('.dropdown-group .HtmlContent > .row');

    // handle opening dropdowns
    $('.filter-label').click(function () {
        $($(this).parent()).toggleClass('open');
    });

    // handle closing dropdowns
    $(document).click(function (e) {
        var target = e.target,
            selector;

        // if a dropdown or its contents are clicked, don't close that dropdown
        if ($(target).parents('.filter-button-group').length) {
            var parent = $(target).parents('.filter-button-group'),
                klass = $(parent).attr('class').split(/\s+/)[0];

            selector = '.filter-button-group:not(.' + klass + ')';
            //otherwise close all dropdowns
        } else {
            selector = '.filter-button-group';
        }
        $(selector).removeClass('open');
    });

    $(".filtered-grants .SearchResults.HLLandingControl .Content > ul").isotope({
        itemSelector: 'li',
        layoutMode: 'fitRows'
    });

    var groupFilterButtons = $('.filter-button-group');

    $(groupFilterButtons).each(function (i) {
        w = window;

        var filterButtonGroupEach = groupFilterButtons[i];

        firstFilterClass = filterButtonGroupEach.className.split(' ')[0];

        w['arr_' + firstFilterClass] = [];
    });

    // add 'clear all' button
    var clearAllButton = '<button class="clear-filters-btn" type="button" onclick="clearFilters();"><span>Clear</span></button>';
    $(clearAllButton).appendTo('.dropdown-group .HtmlContent > .row');

    // Update Filters When Drop down input clicked
    $('.checkbox-filter').click(function () {
        var self = $(this),
            input = $(self).find('input');

        handleCheckboxClick(input);
    });

    function handleCheckboxClick(self) {
        var parent = $(self).parents('.filter-button-group'),
            selectors = $(parent).find('.checkbox-filter input').toArray(),
            parentGroup = $(parent).attr('class').split(/\s+/)[0],
            label = $(parent).find('.filter-label'),
            text = $(self).attr('data-filter').toLowerCase(),
            labelText,
            defaultText = '';

        text = text.substring(1, text.length);

        //toggle active class
        $(self).toggleClass('active');
        $(self).parent().toggleClass('is-active');

        //check for show all
        var dataFilter = $(self).attr('data-filter');
        if (!dataFilter && $(self).hasClass('active')) {
            for (var i = 1; i < selectors.length; i++) {
                var checkbox = selectors[i];
                $(checkbox).removeClass('active');
                $(checkbox).parent().removeClass('is-active');
                checkbox.checked = false;
            }
        } else {
            $(selectors[0]).removeClass('active');
            $($(selectors)[0]).parent().removeClass('is-active');
            selectors[0].checked = false;
        }

        // set dropdown label text

        filterButtonGroup = $('.filter-button-group');

        $(filterButtonGroup).each(function (i) {
            var filterButtonFirstElement = filterButtonGroup[i];
            var elementFirstClass = filterButtonFirstElement.className.split(' ')[0];
            var classConversion;

            for (var i = 0; i < filterText.length; i++) {
                var currText = filterText[i],
                    currTextClass = currText.categoryClass;

                if (currTextClass == elementFirstClass) {
                    classConversion = currText.categoryName;
                } else if (currTextClass == text) {
                    text = currText.categoryName;
                }
            }

            switch (parentGroup) {
                case elementFirstClass:
                    if (!dataFilter) {
                        w['arr_' + elementFirstClass] = [];
                    }
                    labelText = w['arr_' + elementFirstClass];
                    defaultText = classConversion;
                    break;
            }
        });

        if ($(self).hasClass('active') && !!text && text !== 'all') {
            labelText.push(text);
        } else {
            var index = labelText.indexOf(text);
            if (index !== -1) {
                labelText.splice(index, 1);
            }
        }

        if (labelText.length) {
            labelText = labelText.join(', ');
            $(label).text(labelText);
            $(parent).find('.filter-content').addClass('has-selection');
        } else {
            $(label).text(defaultText);
            $(parent).find('.filter-content').removeClass('has-selection');
        }

        updateFilters();
    }

    $(document).click(function (e) {
        var target = e.target,
            selector;

        if ($(target).parents('.filter-content').length) {
            var parent = $(target).parents('.filter-content'),
                klass = $(parent).parent().attr('class').split(/\s+/)[0];
            selector = '.filter-button-group:not(.' + klass + ') .filter-content';
        } else {
            selector = '.filter-content';
        }
        $(selector).removeClass('open');
    });
});

function updateSelection(val, klass, filters) {
    var checkboxes = $(val).find('.active').toArray(),
        localFilters = [];

    $(checkboxes).each(function () {
        var dataFilter = $(this).attr('data-filter');
        localFilters.push(dataFilter);
    });

    filters[klass] = localFilters;
}

function updateFilters() {
    var groups = $('.filter-button-group').toArray(),
        filters = {};

    $(groups).each(function () {
        var self = $(this),
            klass = $(self).attr('class').split(/\s+/)[0],
            selector = '.' + klass;

        updateSelection(selector, klass, filters);
    });

    var filterVal = concatFilters(filters);

    $('.filtered-grants .SearchResults.HLLandingControl .Content > ul ').isotope({ filter: filterVal });
}

function concatFilters(obj) {
    var allFilters = [];

    for (var prop in obj) {
        var group = obj[prop];
        if (!group.length) {
            continue;
        }

        if (!allFilters.length) {
            allFilters = group.slice(0);
            continue;
        }

        var nextFilterList = [];

        for (var i = 0; i < allFilters.length; i++) {
            for (var j = 0; j < group.length; j++) {
                var item = allFilters[i] + group[j];
                nextFilterList.push(item);
            }
        }

        allFilters = nextFilterList;
    }

    allFilters = allFilters.join(', ');

    return allFilters;
}

function makinFilters() {
    categoryList = [];

    $('.label-search-tag:not([aria-label*="User"])').each(function () {
        var self = $(this);
        categoriesMaster = {};
        var ariaLabels = $(self).attr('aria-label');
        var filterCategory = ariaLabels.indexOf(':');
        var categoryValue = ariaLabels.slice(6, filterCategory);
        var tagValueStart = ariaLabels.indexOf('tag=') + 4;
        var tagValue = ariaLabels.slice(tagValueStart, ariaLabels.length);
        categoriesMaster.categoryType = categoryValue;
        categoriesMaster.tag = tagValue;
        categoryList.push(categoriesMaster);


    });

    categoryList.forEach(function (category) {
        var categoryType = category.categoryType;

        if (categoryType != 'Honoree Year') {
            var categoryTypeClassConversion = categoryType.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]+/g, '').toLowerCase();


            var categoryTag = category.tag;

            categoryTagClassConversion = categoryTag
                .replace(/\s+/g, '-')
                .replace(/[^a-zA-Z0-9\-]+/g, '')
                .toLowerCase();

            if (
                $('.dropdown-group .HtmlContent > div.' + categoryTypeClassConversion + '.filter-button-group').length === 0
            ) {

                // add filter class + text to array
                var tempObj = {
                    categoryName: categoryType,
                    categoryClass: categoryTypeClassConversion
                }
                filterText.push(tempObj);
                // add new filter group
                $('.dropdown-group .HtmlContent').append(
                    '<div class="' +
                    categoryTypeClassConversion +
                    ' filter-button-group "><span class="filter-label">' +
                    category.categoryType +
                    '</span><div class="filter-content"><ul class="multiple-select"></ul></div></div>'
                );

            }

            if ($('.filter-button-group').hasClass(categoryTypeClassConversion)) {

                if (
                    $('ul.multiple-select > li.checkbox-filter input[data-filter=".' + categoryTagClassConversion + '"]')
                        .length === 0
                ) {

                    // add text to array
                    var tempObj = {
                        categoryName: categoryTag,
                        categoryClass: categoryTagClassConversion
                    }
                    filterText.push(tempObj);

                    // add to filter group
                    $('div.' + categoryTypeClassConversion + '.filter-button-group ul.multiple-select').append(
                        '<li class="checkbox-filter"><input type="checkbox" id="' +
                        category.tag +
                        '" data-filter=".' +
                        categoryTagClassConversion +
                        '">' +
                        category.tag +
                        '<span class="checkmark"></span></li>'
                    );

                }
            }

        }


    });

    $('.filter-button-group').wrapAll('<div class="row "/>');


    $('.filter-button-group .filter-content .multiple-select').prepend(
        '<li class="checkbox-filter"><input type="checkbox" id="all" data-filter="">Show All<span class="checkmark"></span></li>'
    );

    $('.filter-button-group').each(function () {
        var self = $(this),
            multiselect = $(self).find('.multiple-select'),
            listItems = multiselect.children('li:not(:contains("Show All"))').get();
        listItems.sort(sortAlphaNum);
        $.each(listItems, function (idx, itm) {
            multiselect.append(itm);
        });
    });

    function sortAlphaNum(a, b) {

        var aText = $(a).text(),
            bText = $(b).text(),
            regexAlpha = /[a-zA-Z*]/g,
            regexNum = /[0-9*]/g;

        aText = aText.toString();
        aText = aText.toLowerCase();

        bText = bText.toString();
        bText = bText.toLowerCase();

        // remove numbers
        var aTextAlpha = aText.replace(regexNum, ''),
            bTextAlpha = bText.replace(regexNum, '');

        // remove extra words
        var aTextAlphaFirstWord = aTextAlpha.split(' ')[0],
            bTextAlphaFirstWord = bTextAlpha.split(' ')[0];

        // remove letters
        var aTextNum = parseInt(aText.replace(regexAlpha, '')),
            bTextNum = parseInt(bText.replace(regexAlpha, ''));

        // alphabetically sorting words
        if (!(aTextAlphaFirstWord === bTextAlphaFirstWord)) {
            return aTextAlpha > bTextAlpha ? 1 : -1;
        } else {
            // sorting alphanumeric values
            return aTextNum > bTextNum ? 1 : -1;
        }

    }

}

function clearFilters() {

    var selectors = $('.checkbox-filter input');

    // remove active/checked status from filter checkboxes
    $(selectors).each(function () {
        var selector = $(this);
        $(selector).removeClass('active');
        selector.checked = false;
        $(selector).parent().removeClass('is-active');
    });

    // remove content from filter array

    $('.filter-button-group').each(function () {
        var self = $(this),
            klass = $(self).attr('class').split(' ')[0];

        w['arr_' + klass].splice(0, w['arr_' + klass].length);

        var filterLabel = $(self).find('.filter-label'),
            classConversion;

        for (var i = 0; i < filterText.length; i++) {
            var currText = filterText[i],
                currTextClass = currText.categoryClass;

            if (currTextClass == klass) {
                classConversion = currText.categoryName;
            }
        }
        $(filterLabel).text(classConversion);
    });

    // show all items in the grid and reset filter dropdowns
    $('.filtered-grants .SearchResults.HLLandingControl .Content > ul ').isotope({ filter: '*' });
}