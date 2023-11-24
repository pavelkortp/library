var pathname = $(location).attr('pathname');
var bookIdPosition = pathname.lastIndexOf('/') + 1;
var isBookInUse = false;
var bookId;

doAjaxQuery('GET', '/api/v1/books/' + pathname.substr(bookIdPosition), null, function(res) {
    view.fillBookInfo(res.data);
    if (res.data.event) {
        isBookInUse = true;
        bookId = res.data.id;
    }
});

/* --------------------Show the result, for sending the -----------------------
----------------------email in the queue for the book ---------------------- */
// var showResultSendEmailToQueue = function(email, result) {
//     var busy = $('#bookID').attr('busy');
//     $('.form-queue', '.btnBookID', (busy === null) ? '.freeBook' : '.busyBook').css('display', 'none');
//     $('.response').css('display', 'block');
//     $('span.youEmail').text(' ' + email);
// };

/*--------------- Send email. Get in Queue in for a book ---------------------*/
// var sendEmailToQueue = function(id, email) {
//     doAjaxQuery('GET', '/api/v1/books/' + id + '/order?email=' + email, null, function(res) {
//         showResultSendEmailToQueue(email, res.success);
//     });
// };

/* --------------- Checking validity of email when typing in input -----------*/
// $('.orderEmail').keyup(function(event) {
//     var email = $(this).val();
//     var isEmail = controllers.validateEmail(email);
//     if (email === '') {
//         $('.input-group').removeClass('has-error has-success');
//         views.hideElement('.glyphicon-remove', '.glyphicon-ok');
//     } else {
//         if (isEmail) {
//             views.showSuccessEmail();
//             if (event.keyCode == 13) {
//
//                 var id = $('#bookID').attr('book-id');
//                 sendEmailToQueue(id, email);
//             }
//         } else {
//             views.showErrEmail();
//         }
//     }
// });
/*------------------ Sending email by clicking on the button ----------------*/
$('.btnBookID').click(function (event) {
    // var email = $('.orderEmail').val();
    // var isEmail = controllers.validateEmail(email);
    // if (isEmail) {
    //     views.showSuccessEmail();
    //     var id = $('#bookID').attr('book-id');
    //     sendEmailToQueue(id, email);
    // } else {
    //     views.showErrEmail();
    // }
    // if (isBookInUse) {
    //     views.showSubscribe(
    //         "Сейчас эта книга находится на руках, у одного из наших учеников." +
    //         " Оставь свой email и мы сообщим, как только книга вновь" +
    //         " появится в библиотеке", bookId);
    // } else 
    {
        alert(
            "Книга свободна и ты можешь прийти за ней." +
            " Наш адрес: г. Кропивницкий, переулок Васильевский 10, 5 этаж." +
            " Лучше предварительно прозвонить и предупредить нас, чтоб " +
            " не попасть в неловкую ситуацию. Тел. 099 196 24 69" +
            " \n\n" +
            "******************\n" +
            "Кстати, если вы читаете этот текст, то автор сайта еще не отсылает ajax запрос на увеличение количества кликов на кнопку по этой книге"
        );
    }
});
