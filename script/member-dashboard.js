$(function () {
    // First Dashboard row
    $('.dashboard-img').wrap('<div class="dashboard-row-1 row" />');

    $('.dashboard-img').append('<div class="dashboard-name" ></div>');

    $('.dashboard-name').append('<span class="greeting">Welcome back,</span><br><h4><a href="' + $('.HLWelcome ul#ProfileContainer .panel-body a[id*="profileLink"]').attr('href') + '">' + $('.HLWelcome ul#ProfileContainer .panel-body h4').text() + '</a>!</h4>');

    var messageCount = $('a[id*="MessagesCount"]').text().trim();

    var messageHref = $('a[id*="MessagesCount"]').attr('href');

    var messageNumber = messageCount.substring(0, 2);

    // console.log(messageNumber);

    $('<a class="unread-messages" href="' + messageHref + '">' + messageNumber + 'Unread Messages</a>').insertAfter('.dashboard-name h4');

    $($('div[id*="Welcome_Details_CompleteBarProgress"] > .progress').clone().appendTo('.dashboard-row-1'));

    $('.dashboard-row-1 .progress').wrap('<div class="progress-bar-wrap"></div>')

    $('.dashboard-row-1 .progress-bar-wrap').prepend('<h4>Profile Completion</h4>');

    // Second Dashboard Row
    $('.quick-links.icon').wrapAll('<div class="dashboard-row-2 row" />');

    $('.dashboard-row-2').prepend('<h4>Quick Links</h4>');

    // Second Dashboard Row
    $('.dashboard-button').wrapAll('<div class="dashboard-row-3 row" />');

    $('.dashboard-row-3').prepend('<h4>Get Involved</h4>');

    // Make Dashboard 
    $('div[class*="dashboard-row-"]').wrapAll('<div class="member-dashboard" />');

    $('.member-dashboard').wrap('<div class="member-dashboard-wrap" />');

    $('.member-dashboard').prepend('<button class="btn btn-close"><i class="far fa-times"></i>Close</button>');

    // create logout link
    var logoutLink = $('#ProfileContainer a[id*="logoutLink"]').clone();

    $(logoutLink).insertAfter('.member-dashboard button.btn-close');

    $('.member-dashboard a[id*="logoutLink"]').prepend('<i class="far fa-sign-out"></i>');

    $('#MPOuterMost').append($('.member-dashboard-wrap'));

    $('.member-dashboard-wrap').wrap('<div class="member-dashboard-backdrop"/>');

    $('.HLWelcome .Welcome .imgButton').after('<button type="button" class="my-dashboard-button">My Dashboard</button>');

    $('.my-dashboard-button').click(function () {

        $('.member-dashboard-wrap').addClass('open');

        $('.member-dashboard-backdrop').addClass('open');

    });

    $('.member-dashboard .btn.btn-close').click(function () {

        $('.member-dashboard-wrap').removeClass('open');

        $('.member-dashboard-backdrop').removeClass('open');

    });

    $('.member-dashboard-backdrop.open').click(function () {

        console.log('bing');

        $('.member-dashboard-wrap').removeClass('open');

        $('.member-dashboard-backdrop').removeClass('open');

    });


});