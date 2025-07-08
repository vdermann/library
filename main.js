// List of books.
const myLibrary = [];

// Variables.
const addBookBtn = document.querySelector("#showModal");
const closeModalBtn = document.querySelector("#closeModal");
const formModal = document.querySelector("dialog");

// Opens the form.
addBookBtn.addEventListener("click", (event) =>  {
  event.preventDefault();
  formModal.showModal();
});

// Closes the form.
closeModalBtn.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("form").reset();  // Reset the input fields.
  formModal.close();  
});


// Book Constructor.
function Book(title, author, pages, read, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  // this.info = function() {
  //   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
  // }
}


// Add the book into myLibrary array and displays the card in the page.
function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const newBook = new Book(title, author, pages, read, id);
  myLibrary.push(newBook);
  displayBook();
}


// Adding a new book. 
// Manipulation of form data.
const addNewBook = document.querySelector("#addNewBook"); 
addNewBook.addEventListener("click", (event) => {
  let isFormComplete = document.querySelector("form").checkValidity();
  if (!isFormComplete) {
    document.querySelector("form").reportValidity();
  } else {
    event.preventDefault();
    // Gets book details.
    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const bookPages = document.querySelector("#pages");
    const bookWasRead = document.querySelector("#read");
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookWasRead.checked);
    document.querySelector("form").reset();   // Reset the input fields.
    formModal.close()
  }
})


// Prevent duplicates from existing before displaying books on the page.
const booksContainer = document.querySelector(".booksContainer");
const addedBookIds = [];

function displayBook() {
  // while (booksContainer.firstChild) {
  //   booksContainer.removeChild(booksContainer.firstChild);
  // }
  myLibrary.forEach(book => {
    if (!addedBookIds.includes(book.id)) {
      const bookCard = createBookCard(book);
      booksContainer.appendChild(bookCard);
      addedBookIds.push(book.id);
    }
  });
}


// BookCard created with JS to inject into HTML.
function createBookCard(book) {     // Passing the book object as a parameter.
  // Containers.
  const bookCard = document.createElement('div');
  bookCard.classList.add('bookCard');
  const bookDetails = document.createElement('div');
  bookDetails.classList.add('bookDetails');

  // Paragraphs (form fields).
  const titleP = document.createElement('p');
  titleP.classList.add('book__title');
  titleP.textContent = book.title;
  const authorP = document.createElement('p');
  authorP.classList.add('book__author');
  authorP.textContent = book.author;
  const pagesP = document.createElement('p');
  pagesP.classList.add('book__pages');
  pagesP.textContent = `${book.pages} pages`;
  const readP = document.createElement('p');
  readP.classList.add('book__read');


  bookDetails.appendChild(titleP);
  bookDetails.appendChild(authorP);
  bookDetails.appendChild(pagesP);
  bookDetails.appendChild(readP);

  // Buttons
  const bookButtons = document.createElement('div');
  bookButtons.classList.add('bookButtons');

  // toggleRead
  const toggleReadButton = document.createElement('button');
  toggleReadButton.classList.add('svgButton');
  toggleReadButton.id = 'toggleRead';
  const toggleReadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  toggleReadSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  toggleReadSvg.setAttribute('viewBox', '0 0 24 24');
  const toggleReadTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  toggleReadTitle.textContent = 'Mark as read';
  const toggleReadPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  toggleReadPath.setAttribute('d', 'M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z');
  toggleReadSvg.append(toggleReadTitle, toggleReadPath);
  toggleReadButton.appendChild(toggleReadSvg);

  if (book.read === true) {
    readP.textContent = "Read";
    readP.classList.remove("book__read__no");
    readP.classList.add("book__read__yes");
    // Changes the SVG icon.
    toggleReadTitle.textContent = "Mark as read";
    toggleReadPath.setAttribute("d", 'M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z')
    toggleReadPath.setAttribute("fill", "hsl(94, 17%, 51%)");
  } else {
    readP.textContent = "Unread";
    readP.classList.remove("book__read__yes");
    readP.classList.add("book__read__no");
    // Changes the SVG icon.
    toggleReadTitle.textContent = "Mark as unread";
    toggleReadPath.setAttribute("d", "M13.09 20C13.21 20.72 13.46 21.39 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H18C19.11 2 20 2.9 20 4V13.09C19.67 13.04 19.34 13 19 13C18.66 13 18.33 13.04 18 13.09V4H13V12L10.5 9.75L8 12V4H6V20H13.09M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z")
    toggleReadPath.setAttribute("fill", "hsl(0, 0%, 49%)");
  }

  // toggleRead Listener
  toggleReadButton.addEventListener("click", () => {
    if (readP.classList.contains("book__read__yes")) {
        readP.classList.remove("book__read__yes");
        readP.classList.add("book__read__no");
        readP.textContent = "Unread";
        book.read = false;
        // Changes the SVG icon.
        toggleReadTitle.textContent = "Mark as unread";
        toggleReadPath.setAttribute("d", "M13.09 20C13.21 20.72 13.46 21.39 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H18C19.11 2 20 2.9 20 4V13.09C19.67 13.04 19.34 13 19 13C18.66 13 18.33 13.04 18 13.09V4H13V12L10.5 9.75L8 12V4H6V20H13.09M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z")
        toggleReadPath.setAttribute("fill", "hsl(0, 0%, 49%)");
      } else {
        readP.classList.remove("book__read__no");
        readP.classList.add("book__read__yes");
        readP.textContent = "Read";
        book.read = true;
        // Changes the SVG icon.
        toggleReadTitle.textContent = "Mark as read";
        toggleReadPath.setAttribute("d", 'M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z')
        toggleReadPath.setAttribute("fill", "hsl(94, 17%, 51%)");
      }
  });

  // removeBook
  const removeBookButton = document.createElement('button');
  removeBookButton.classList.add('svgButton');
  removeBookButton.id = 'removeBook';
  const removeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  removeSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  removeSvg.setAttribute('viewBox', '0 0 24 24');
  const removeTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  removeTitle.textContent = 'Remove';
  const removePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  removePath.setAttribute('d', 'M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z');
  removeSvg.append(removeTitle, removePath);
  removeBookButton.appendChild(removeSvg);

  // removeBook Listener
  removeBookButton.addEventListener("click", () => {
    // Removes from the array.
    const index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
    // Removes from the DOM.
    bookCard.remove()
  });


  // Combine everything.
  bookButtons.append(toggleReadButton, removeBookButton);
  bookCard.append(bookDetails, bookButtons);

  return bookCard;
}


// Manually added books.
addBookToLibrary("Demian", "Hermann Hesse", "189", true);
addBookToLibrary("La Biblioteca de Babel", "J. L. Borges", "13", false);


// const ficciones = new Book("Ficciones", "J. L. Borges", "221", "not finished yet")
// console.log(ficciones.info())