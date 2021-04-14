import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Form from '../Form/Form'

const CreateBook = (props) => {
  const [book, setBook] = useState({ title: '', picture: '', website: '', chapter: '', description: '' })
  const [created, setCreated] = useState(false)

  const handleChange = event => {
    event.persist()
    setBook(book => ({ ...book, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/books`,
      method: 'POST',
      data: { book },
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(res => setCreated(res.data.book._id))
      .catch()
  }

  if (created) {
    return <Redirect to={`/books/${created}`} />
  }

  return (
    <Form
      book={book}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreateBook
