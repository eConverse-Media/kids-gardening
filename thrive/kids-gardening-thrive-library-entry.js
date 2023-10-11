$(function () {

    var backtoLibraryButton = $('a[id*="backToDiscussions"]');

    var href = $(backtoLibraryButton).attr('href'),
        hrefSubstring,
        newHref;

    hrefSubstring = href.substring(href.indexOf('?LibraryKey='), href.length);

    if (hrefSubstring == '?LibraryKey=a72e2f53-f60c-47ef-bbcc-b7cbc505385f') {
        newHref = 'resource-library';
    } else {
        newHref = href;
    }

    $(backtoLibraryButton).attr('href', newHref);


});