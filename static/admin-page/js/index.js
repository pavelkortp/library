var drawItemsOnScroll,
    isScrollRunning = false;
console.log(isScrollRunning);

$(document).ready(function () {

    (() => {
        data = {
            page: 1,
        };
    })();
    doAjaxQuery('GET', 'admin/api/v1/books', data, function (res) {
        // Adding received books
        view.addBooksItems(res.data.books, true);
        view.addPages(res.data.totalPages, true);

        if (localStorage.getItem('h')) {
            $(window).scrollTop(localStorage.getItem('h'));
            localStorage.removeItem('h');
        }
    });
});
function getParameterByName(name, url) {
    if (!url) url = $(location).attr('href');
    // console.log(url);
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



function removeBook(id) {
    view.showConfirm(id);
}

function getBooks(pageNumber) {
    
    data = {
        page: pageNumber
    };
    doAjaxQuery('GET', 'admin/api/v1/books', data, function (res) {
        // Adding received books
        view.addBooksItems(res.data.books, true);

        if (localStorage.getItem('h')) {
            $(window).scrollTop(localStorage.getItem('h'));
            localStorage.removeItem('h');
        }
    });

}
