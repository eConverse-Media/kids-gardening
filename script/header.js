$(function () {

    $('.resource-header').each(function () {
        var htmlContent = $(this).find('.HtmlContent');
        $(htmlContent).wrapInner('<div class="left-content"/>');
        var img = $(this).find('img');
        $(img).hide();
        var imgSrc = $(img).attr('src');
        $(htmlContent).append('<div class="right-content"/>');
        var rightContent = $(this).find('.right-content');
        $(rightContent).css('background-image', 'url("' + imgSrc + '")');
    });

});