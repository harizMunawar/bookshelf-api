/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const books = require('./books');

const addBook = (request, h) =>{
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount ? true:false;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt};
  books.push(newBook);

  const index = books.findIndex((book)=> book.id === id);

  if (index !== -1) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    });

    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });

    response.code(500);
    return response;
  }
};

const getAllBooks = (request, h)=>{
  const {name, reading, finished} = request.query;
  let result = books;

  if (name) result = result.filter((book)=>book.name.toLowerCase().includes(name.toLowerCase()));
  if (reading) result = result.filter((book)=>book.reading === (reading == '1' ? true: false));
  if (finished) result = result.filter((book)=>book.finished === (finished == '1' ? true:false));

  const response = h.response({
    status: 'success',
    data: {
      'books': result.map((book)=>{
        return ({id: book.id, name: book.name, publisher: book.publisher});
      }),
    },
  });
  response.code(200);
  return response;
};

const getBook = (request, h)=>{
  const {bookid} = request.params;
  const book = books.findIndex((book)=> book.id === bookid);

  if (book !== -1) {
    const response = h.response({
      status: 'success',
      data: {
        'book': books[book],
      },
    });

    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  }
};

const updateBook = (request, h) => {
  const {bookid} = request.params;
  const index = books.findIndex((book)=> book.id === bookid);
  const updatedAt = new Date().toISOString();

  if (index !== -1) {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const finished = readPage === pageCount ? true:false;

    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });

      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });

      response.code(400);
      return response;
    }

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });

    response.code(404);
    return response;
  }
};

const deleteBook = (request, h)=>{
  const {bookid} = request.params;
  const index = books.findIndex((book) => book.id === bookid);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });

    response.code(404);
    return response;
  }
};

module.exports = {addBook, getAllBooks, getBook, updateBook, deleteBook};
