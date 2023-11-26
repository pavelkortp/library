var pathname = $(location).attr('pathname');
var bookIdPosition = pathname.lastIndexOf('/') + 1;
var isBookInUse = false;
var bookId;

doAjaxQuery('GET', '/api/v1/books/' + pathname.substr(bookIdPosition), null, function (res) {
    view.fillBookInfo(res.data);

    if (res.data.event) {
        isBookInUse = true;
        bookId = res.data.id;
    }
});


$('.btnBookID').click(function () {

    doAjaxQuery('PATCH', '/api/v1/books/' + pathname.substr(bookIdPosition), { clicks: true }, function (res) {
        alert(
            "Книга свободна и ты можешь прийти за ней." +
            " Наш адрес: г. Кропивницкий, переулок Васильевский 10, 5 этаж." +
            " Лучше предварительно прозвонить и предупредить нас, чтоб " +
            " не попасть в неловкую ситуацию. Тел. 099 196 24 69"
        );
    });
});
