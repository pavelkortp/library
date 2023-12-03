$(document).ready(function () {

    const data = {
        page: 1,
    };

    getTable(data);
    $('#logout').on('click', logout);
    $('#create').on('click', create);
    
});

function getTable(data) {
    doAjaxQuery('GET', 'admin/api/v1/books', data, function (res) {
        // Adding received books
        view.addBooksItems(res.data.books, true);
        view.addPages(res.data.totalPages, true);

        if (localStorage.getItem('h')) {
            $(window).scrollTop(localStorage.getItem('h'));
            localStorage.removeItem('h');
        }
    });
}


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

function create(e) {
    e.preventDefault();

    const formData = new FormData($('#bookForm')[0]); // Замініть 'yourFormId' на ID вашої форми

    fetch('http://localhost:3000/admin/api/v1/books/create', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            swal({
                title: 'Чудово',
                text: 'Книгу успішно додано!',
                type: 'success',
                confirmButtonColor: '#27AE60',
                confirmButtonText: 'Закрити',
                closeOnConfirm: false
            });
            getTable(data);
        } else {
            swal({
                title: 'Погані новини',
                text: 'При додаванні книги виникла помилка(',
                type: 'warning',
                confirmButtonColor: '#27AE60',
                confirmButtonText: 'Закрити',
                closeOnConfirm: false
            });
        }
    })
    .catch(error => {
        swal({
            title: 'Погані новини',
            text: 'Ви ввели некоректні/не всі дані',
            type: 'warning',
            confirmButtonColor: '#27AE60',
            confirmButtonText: 'Закрити',
            closeOnConfirm: false
        });
    });
}



function logout() {
    fetch('admin', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('none:none'),
        }
    }).then(
        () => {
            window.location.href = '/';
        }
    );
}

function getBooks(pageNumber) {
    const data = {
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
