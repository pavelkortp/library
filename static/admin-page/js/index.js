var drawItemsOnScroll,
    isScrollRunning = false;
console.log(isScrollRunning);

$(document).ready(function () {

    $('#remove').on('click', function () {
        var id = 29;
        view.showConfirm(id);
    });

    $(document).scroll(function () {
        if ((($(document).height() - $(window).scrollTop()) < (2 * $(window).height())) && !isScrollRunning) {
            isScrollRunning = true;
            drawItemsOnScroll();
        }
    });
});
