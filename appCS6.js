class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{

  addBook (book){
    //Coloco la lista de libros para luego adjuntar el nuevo libro
    const bookList = document.getElementById('book-list');
    
    //Creamos el elemento html para el libro
    const bookElement = document.createElement('tr');
    bookElement.innerHTML = ` 
                      <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.isbn}</td>
                      <td><a href='#'class='delete'>X</a></td>
                    `;
    //adjuntamos bookElement a bookList
    bookList.appendChild(bookElement);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert (message,error) {
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    const alert = document.createElement('div');
    alert.classList = `alert ${error}`;
    alert.appendChild(document.createTextNode(message));

    container.insertBefore(alert,form);

    setTimeout(function(){
      document.querySelector(".alert").remove();
    }, 3000);
  }  

  deleteBook(target) {
    if(target.classList = 'delete'){
      target.parentElement.parentElement.remove();

    }
  }
}

//StoreClass

class Store {

static getBook(){

  let books;
  if(localStorage.getItem('book') === null){
    books = [];
  }else{
    books = JSON.parse(localStorage.getItem('book'));
  }
  return books;
}

static addBook(book){

 const bookList = Store.getBook();
 bookList.push(book);
 localStorage.setItem('book',JSON.stringify(bookList));

}

static removeBook(isbn){
  const bookList = Store.getBook();
  bookList.forEach(function (book,index) {
    if(isbn === book.isbn){
      bookList.splice(index,1);
    }
  });
  localStorage.setItem('book',JSON.stringify(bookList));
}

static displayBook(){
const bookList = Store.getBook();
bookList.forEach(function (book) {
  const ui = new UI();
  ui.addBook(book);
});
}

}

//DOM
document.addEventListener('DOMContentLoaded',Store.displayBook);

document.getElementById('book-form').addEventListener('submit',function(e) {

  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;



  //Guardamos los datos en Book
  const book= new Book (title,author,isbn);
  //inicializamos IU
  const ui = new UI();
  
  if(title ===''||author===''||isbn===''){
    ui.showAlert('Please full the fields','error');
  }else{
    //llamamos al prototype de UI para mostrar la lista de libros
    ui.addBook(book);
    Store.addBook(book);
    ui.clearFields(book);
    ui.showAlert('Your book is on the list','success');
  }
  e.preventDefault();
})

document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('The book was remove','success');
})