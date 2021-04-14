import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Form from '../Form/Form'

const EditBook = (props) => {
  const [book, setBook] = useState({ title: '', picture: '', website: '', chapter: '', description: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/books/${props.match.params.id}`)
      .then(res => setBook(res.data.book))
      .catch()
  }, [])

  const handleChange = event => {
    event.persist()
    setBook(book => ({ ...book, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/books/${props.match.params.id}`,
      method: 'PATCH',
      data: { book },
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(res => setUpdated(true))
      .catch()
  }

  if (updated) {
    return <Redirect to={`/books/${props.match.params.id}`} />
  }

  return (
    <Form
      book={book}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditBook
