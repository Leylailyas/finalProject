$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1) {
            $("body").addClass("is-scrolling");
        } else {
            $("body").removeClass("is-scrolling");
        }
    });
})