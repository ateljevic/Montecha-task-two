import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';

import { fetchCover } from '../../../utils/Api';

const CUNK_SIZE = 5;

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }

        this.openBook = this.openBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openBook = (value) => {
        this.props.openBook(value)
    }

    handleChange = (event, value) => {
        this.setState((state, props) => ({
            page: value
        }));
    };

    render() {
        return (
            <span>
                <Pagination count={Math.ceil(this.props.books.length / CUNK_SIZE)} page={this.state.page} onChange={this.handleChange} />
                <List>
                    {this.props.books.slice(CUNK_SIZE * (this.state.page - 1), CUNK_SIZE * (this.state.page - 1) + CUNK_SIZE).map(book => (
                        <span>
                            <ListItem alignItems="flex-start" onClick={() => this.openBook(book)}>
                                <ListItemAvatar>
                                    <img alt="no" src={fetchCover(book.CoverKey, 's')} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={book.Title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                            </Typography>
                                            {book.Authors && book.Authors.join()}
                                            <p>First published in {book.FirstPublishYear}</p>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider orientation="horizontal" />
                        </span>
                    ))}
                </List>
            </span>
        );
    }
}

export default Books;