import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Books from './books/Books';
import Book from './book/Book';

import { fetchBooks, fetchBook } from '../../utils/Api';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            book: {},
            showBookInfo: false,
            query: ''
        }

        this.searchBooks = this.searchBooks.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openBook = this.openBook.bind(this);
    }

    searchBooks = async () => {
        const books = await fetchBooks(this.state.query)
        this.setState(state => ({
            books: books,
            showBookInfo: false,
            query: ''
        }));
    }

    handleChange = (value) => {
        this.setState(state => ({
            query: value
        }));
    }

    openBook = async (value) => {
        const book = await fetchBook(value.Key)
        this.setState(state => ({
            book: { ...value, ...book },
            showBookInfo: true
        }));
    }

    render() {
        return (
            <div>
                <Paper component="form">
                    <TextField
                        placeholder="Search for the books"
                        style={{ width: '90%', padding: '1%' }}
                        value={this.state.query}
                        onChange={(e) => this.handleChange(e.target.value)}
                    />
                    <IconButton onClick={this.searchBooks}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <div>
                    {!this.state.showBookInfo &&
                        <Books
                            books={this.state.books}
                            openBook={this.openBook}
                        />}
                    {this.state.showBookInfo &&
                        <Book book={this.state.book} />}
                </div>
            </div>
        );
    }
}

export default Container;