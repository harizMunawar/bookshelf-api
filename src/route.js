const {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook} = require('./handler');

const route = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookid}',
    handler: getBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookid}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookid}',
    handler: deleteBook,
  },
];

module.exports = route;
