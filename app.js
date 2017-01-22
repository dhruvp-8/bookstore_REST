var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to mongoose
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
if(env == 'dev')
{
    mongoose.connect('mongodb://localhost/bookstore');
}
else {
    mongoose.connect('mongodb://admin_bookstore:dp5738!!@ds155737.mlab.com:55737/bookstore');
}
var db = mongoose.connection;

app.get('/',function(req,res){
    res.send('Please use /api/books or /api/genres');
});

//Get a genre
app.get('/api/genres',function(req,res){
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    })
});

//Update a genre
app.put('/api/genres/:_id',function(req,res){
    var id = req.params._id
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    })
});

//Insert a new genre
app.post('/api/genres',function(req,res){
    var genre = req.body;
    Genre.addGenre(genre, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    })
});

//Delete a genre
app.delete ('/api/genres/:_id',function(req,res){
    var id = req.params._id;
    Genre.deleteGenre(id, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    })
});

//Get books
app.get('/api/books',function(req,res){
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    })
});

//Update a book
app.put('/api/books/:_id',function(req,res){
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
});

//Insert a new book
app.post('/api/books',function(req,res){
    var book = req.body;
    Book.addBook(book, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
});

//Delete a book
app.delete('/api/books/:_id',function(req,res){
    var id = req.params._id;
    Book.deleteBook(id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
});

//Get a single book
app.get('/api/books/:_id',function(req,res){
    Book.getBookById(req.params._id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
});

app.listen(3000);
console.log('Running on port 3000...');
