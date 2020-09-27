//Book constructor
function Book(title,author,isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor 
function UI() {}

// prototype de UI para mostrar la lista de libros

UI.prototype.addBook = function(book){
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

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function (message,error) {
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
UI.prototype.deleteBook = function (target) {
  if(target.classList = 'delete'){
    target.parentElement.parentElement.remove();
  }
}
//DOM
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
    ui.clearFields(book);
    ui.showAlert('Your book is on the list','success');
  }
  e.preventDefault();
})

document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('The book was remove','success');
})