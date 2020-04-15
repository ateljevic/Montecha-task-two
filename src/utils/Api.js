import axios from 'axios';

export const fetchBooks = async (query) => {
    const url = `http://openlibrary.org/search.json?q=${query}`
    const { data } = await axios.get(url);
    if (data) {
        return data.docs.map(book => ({
            Title: book.title,
            Authors: book.author_name,
            FirstPublishYear: book.first_publish_year,
            CoverKey: book.cover_edition_key,
            Key: book.key,
            Publisher: book.publisher
        }));
    } else {
        return [];
    }
}

export const fetchCover = (key, size) => {
    return `https://covers.openlibrary.org/b/olid/${key}-${size.toUpperCase()}.jpg`
}

export const fetchBook = async (key) => {
    const url = `https://openlibrary.org${key}.json`;
    const { data } = await axios.get(url);
    if (data) {
        return {
            Description: data.description ? data.description.value : 'No description available.',
            Subjects: data.subjects
        };
    } else {
        return {};
    }

}