var drawItemsOnClick;

//Executed when the page is loaded
$(document).ready(function () {
    //Anonymous function called during creation: sends a request to the api
    (function () {

        // Data that sends to the server
        data = {
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
            

            if (localStorage.getItem('h')) {
                $(window).scrollTop(localStorage.getItem('h'));
                localStorage.removeItem('h');
            }
        });
    }());
    
    $('#next').click((event)=>{
        event.preventDefault();
        drawItemsOnClick();
    });



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
    doAjaxQuery('GET', '/api/v1/books', reqData, function (res) {
        view.addBooksItems(res.data.books, true);
        changeHistoryStateWithParams('push', res.data.filter, res.data.offset);
        drawItemsOnClick = initDrawItemsOnClick(res.data.total.amount);
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
        limit = global.number_of_items_onscroll,
        offset = parseInt(getParameterByName('count')) || global.items_limit_on_page_load;

    return function () {
        if (offset < maxNumOfItems) {
            var data = {
                'filter': getParameterByName('filter') || "new",
                'limit': limit,
                'offset': offset
            };
            // $("#next").slideDown();
            doAjaxQuery('GET', '/api/v1/books', data,
                function (res) {
                    // $("#next").slideUp();
                    isScrollRunning = false;
                    view.addBooksItems(res.data.books, false);
                    changeHistoryStateWithParams("replace", res.data.filter, res.data.offset);
                });
            offset += limit;
        }
    }
}