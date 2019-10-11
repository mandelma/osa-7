import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Blog for test',
    author: 'Testaaja',
    url: 'http//testaaja.com',
    likes: 12
  }

  const component = render(
    <Blog blog = {blog} />
  )

  const div = component.container.querySelector('.show')
  expect(div).toHaveTextContent(
    'Blog for test'
  )
})