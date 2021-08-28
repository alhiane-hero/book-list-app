const bookForm = document.getElementById('bookForm');
let inputs = bookForm.querySelectorAll('input[type="text"]');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const isbnInput = document.getElementById('isbnInput');
const tableBody = document.getElementById('tableBody');
const notes = document.getElementById('notes');
const clearBtn = document.getElementById('clearBtn');

function emptyInput() {
    inputs.forEach(input => input.value = '');
    inputs[0].focus();
}

function showAllBooks(BooksData) {
    tableBody.innerHTML = '';
    [...BooksData].forEach(book => {
        createNewBook(book.title, book.author, book.isbn);
    });
}
showAllBooks(getBookFromLs());

function createNewBook(titleInputVal, authorInputVal, isbnInputVal) {
    let bookEl = document.createElement('div');
    bookEl.classList.add('book');
    let bookInfoEl = `<div class="table-data">
        <h4 class="titleBook">${titleInputVal}</h4>
    </div>
    <div class="table-data">
        <h4 class="authorBook">${authorInputVal}</h4>
    </div>
    <div class="table-data">
        <h4 class="isbnBook">${isbnInputVal}</h4>
    </div>
    <div class="table-data">
        <h4 class="remove-btn">X</h4>
    </div>`;
    bookEl.innerHTML = bookInfoEl;

    let removeBtn = bookEl.querySelector('.table-data .remove-btn');
    removeBtn.addEventListener('click', _ => {
        remoevBookFromLs(titleInputVal);
        showAllBooks(getBookFromLs());
        notesFunc("Book Removed!", "#080");
    });

    tableBody.appendChild(bookEl);
}

bookForm.addEventListener('submit', event => {
    event.preventDefault();
    let titleInputVal = titleInput.value;
    let authorInputVal = authorInput.value;
    let isbnInputVal = isbnInput.value;
    if (titleInputVal === '' || authorInputVal === '' || isbnInputVal === '') {
        notesFunc("Please fill in all fields!");
    } else {
        createNewBook(titleInputVal, authorInputVal, isbnInputVal);
        notesFunc("Book Added!", "#080");
        addBookToLs({'title': titleInputVal, 'author': authorInputVal, 'isbn': isbnInputVal});
        emptyInput();
    }
}); 

clearBtn.addEventListener('click', event => {
    event.preventDefault();
    clearBooks();
});

function notesFunc(msg, color) {
    notes.innerHTML = '';
    notes.innerHTML = `<p>${msg}</p>`;
    let p = notes.querySelector('p');
    p.style.backgroundColor = color;
    window.setTimeout(_ => p.remove(), 1000);
}

function addBookToLs(bookData) {
    let BooksData = getBookFromLs();
    localStorage.setItem('bookData', JSON.stringify([...BooksData, bookData]));
}

function remoevBookFromLs(Booktitle) {
    let BooksData = getBookFromLs();
    localStorage.setItem('bookData', 
    JSON.stringify(BooksData.filter(bookData => bookData.title !== Booktitle)));
}

function getBookFromLs() {
    let BooksData = JSON.parse(localStorage.getItem('bookData'));
    return localStorage.getItem('bookData') !== null ? BooksData : [];
}

function clearBooks() {
    localStorage.clear();
    showAllBooks(getBookFromLs());
}