import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import axios from 'axios'
import apiUrl from '../../apiConfig'

const Books = (props) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/books`)
      .then((res) => {
        const books = res.data.books
        const myBooks = []
        books.forEach((book) => {
          if (book.owner === props.user._id) {
            myBooks.push(book)
          }
        })
        setBooks(myBooks)
      })
      .catch()
  }, [])

  const myBooksJsx = books.map(book => (
    <Col md="3" className="mb-5" key={book._id}>
      <h6>{book.title.length > 24 ? book.title.substring(0, 24) + '..' : book.title}</h6>
      <Link to={`/books/${book._id}`}>
        <img style={{ height: '300px', width: '210px' }} src={book.picture} />
      </Link>
    </Col>
  ))

  if (!books[0]) return <h1>Loading...</h1>

  return (
    <Fragment>
      <Container className="mt-4">
        <Row>
          {myBooksJsx}
        </Row>
      </Container>
    </Fragment>

  )
}

export default Books
