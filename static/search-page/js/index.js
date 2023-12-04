var drawItemsOnClick;
var booksCount = 0;
var total = 0;

//Executed when the page is loaded
$(document).ready(function () {
    //Anonymous function called during creation: sends a request to the api
    (function () {

        // Data that sends to the server
        data = {
            search: getParameterByName('search'),
            filter: getParameterByName('filter') || global.filter,
            offset: getParameterByName('offset'),
            limit: getParameterByName('count') || global.items_limit_on_page_load
        };

        // The default filter is set on the page
        setSidebarActiveButton(null, data.filter);

        // The request for the books
        doAjaxQuery('GET', '/api/v1/books', data, function (res) {
            // Adding received books
            view.addBooksItems(res.data.books, true);
            // ....
            drawItemsOnClick = initDrawItemsOnClick(res.data.total.amount);
            booksCount += res.data.books.length;
            total = parseInt(res.data.total.amount);
            if (localStorage.getItem('h')) {
                $(window).scrollTop(localStorage.getItem('h'));
                localStorage.removeItem('h');
            }
            checkCount();
        });
    }());

    $('#next').click((event) => {
        event.preventDefault();
        drawItemsOnClick();
    })

    $('#back').click((event) => {
        event.preventDefault();
        hideItemsOnClick()
    })

    $('#content').on('click', '.book', function () {
        localStorage.setItem('h', $(window).scrollTop());
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

function loadIndexPage(reqData) {
    booksCount = 0;
    doAjaxQuery('GET', '/api/v1/books', reqData, function (res) {
        view.addBooksItems(res.data.books, true);
        booksCount += res.data.books.length;
        total = parseInt(res.data.total.amount);
        changeHistoryStateWithParams('push', res.data.search, res.data.filter, res.data.offset);
        drawItemsOnClick = initDrawItemsOnClick(res.data.total.amount);
        checkCount();
    });
}

function setSidebarActiveButton(activeElem, filterStringValue) {
    $('.sidebar_item').removeClass('active');
    if (activeElem) {
        activeElem.closest('a').addClass('active');
    } else {
        $('a[data-filter=' + filterStringValue + ']').addClass('active');
    }
}

function initDrawItemsOnClick(maxItems) {
    var maxNumOfItems = maxItems,
        limit = global.number_of_items_onscroll;

    return function () {
        offset = parseInt(getParameterByName('count')) || global.items_limit_on_page_load;
        if (offset < maxNumOfItems) {
            var data = {
                'search': getParameterByName('search'),
                'filter': getParameterByName('filter') || "new",
                'limit': limit,
                'offset': offset
            };
            doAjaxQuery('GET', '/api/v1/books', data,
                function (res) {
                    booksCount += res.data.books.length;
                    isScrollRunning = false;
                    view.addBooksItems(res.data.books, false);
                    changeHistoryStateWithParams("replace", res.data.search, res.data.filter, res.data.offset);
                    checkCount();
                });
            offset += limit;
        }
    }
}

function hideItemsOnClick() {
    var filter = getParameterByName('filter') || "new";
    var count = parseInt(getParameterByName('count')) - 20;
    var search = getParameterByName('search');
    const offset = (booksCount - roundTo10(booksCount)) || 10;

    if (booksCount - offset >= 20) {
        booksCount -= offset;
        view.hideLastBooks(offset);
        changeHistoryStateWithParams("replace", search, filter, count);
        checkCount();
    }
}

function roundTo10(number) {
    return Math.floor(number / 10) * 10
}

function checkCount() {
    if (booksCount == global.items_limit_on_page_load) {
        show($('#next'));
        hide($('#back'));
    } else if (booksCount > global.items_limit_on_page_load && booksCount < total) {
        show($('#next'));
        show($('#back'));
    } else {
        hide($('#next'));
        show($('#back'));
    }
}


function show(o) {
    o.removeClass('invisible');
    o.addClass('visible');
}

function hide(o) {
    o.addClass('invisible');
}