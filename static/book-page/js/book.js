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
    doAjaxQuery('PATCH', '/api/v1/books/' + pathname.substr(bookIdPosition) + '?increase_clicks=true', null, function (res) {
        swal({
            title: 'Чудово',
            text: "Книжка вільна і ти можеш прийти по неї." +
            " Наша адреса: м. Кропивницький, провулок Василівський 10, 5 поверх." +
            " Краще заздалегідь подзвонити і попередити нас, щоб " +
            " не потрапити в незручну ситуацію. Тел. 099 196 24 69",
            type: 'success',
            closeOnConfirm: false,
            animation: 'slide-from-top',
            icon: "success",
            confirmButtonColor: '#27AE60',
            showLoaderOnConfirm: true
        })
    });
});



// $('.rating').click(function(){
//     doAjaxQuery('PATCH', '/api/v1/books/' + pathname.substr(bookIdPosition) + '?rating=true', null, function (res) {
//         swal({
//             title: 'Чудово',
//             text: "Вашу оцінку враховано",
//             type: 'success',
//             closeOnConfirm: false,
//             animation: 'slide-from-top',
//             icon: "success",
//             confirmButtonColor: '#27AE60',
//             showLoaderOnConfirm: true
//         })
//     });
// })
