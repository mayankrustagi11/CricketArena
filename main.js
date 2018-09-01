$("header a.scroll-btn").on("click", function () {
    $("html, body").animate({
            scrollTop: $(".features").offset().top
        },
        1000
    );
});