import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { fetchCover } from '../../../utils/Api';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.book !== prevProps.book) {
    //         this.setState((state, props) => ({
    //             book: props.book
    //         }));
    //     }
    // }

    render() {
        return (this.props.book ?
            <Card>
                <img src={fetchCover(this.props.book.CoverKey, 'L')} style={{ float: 'left', display: 'inline' }} />
                <CardContent style={{ float: 'left', display: 'inline', width: '50%' }}>
                    <Typography component="h5" variant="h5">
                        {
                            this.props.book.Title ?
                                this.props.book.Title : 'no title'
                        }
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {
                            this.props.book.Authors ?
                                <p>by: {this.props.book.Authors.map(author => <Chip label={author} />)}</p> : 'no authors'
                        }
                        {
                            this.props.book.Subjects ?
                                <p>Subjects: {this.props.book.Subjects.map(subject => <Chip label={subject} />)}</p> : 'no subjects'
                        }
                        {
                            this.props.book.Publisher ?
                                <p>Publishers: {this.props.book.Publisher.map(publisher => <Chip label={publisher} />)}</p> : 'no publishers'
                        }
                        {
                            this.props.book.Publisher ?
                                <p>First published in: {<Chip label={this.props.book.FirstPublishYear} />}</p> : 'no publisher year'
                        }
                        {
                            this.props.book.Description ?
                                <p><b>About the book:</b> {this.props.book.Description}</p> : 'no description'
                        }
                    </Typography>
                </CardContent>
            </Card> : 'nothing to show'
        );
    }
}

export default Book;