import React from 'react'
import SimpleBlog from './SimpleBlog'
import { render, fireEvent } from '@testing-library/react'

const testBlog = {
  title: 'Blog for testing title',
  author: 'Testaaja',
  likes: 13
}


test('Show blog title', () => {
  const component = render(
    <SimpleBlog blog = {testBlog} />
  )

  expect(component.container).toHaveTextContent(
    'Blog for testing title'
  )
})

test('show blog author', () => {

  const component = render(
    <SimpleBlog blog = {testBlog} />
  )

  const div = component.container.querySelector('.blogAuthor')
  expect(div).toHaveTextContent(
    `${testBlog.author}`
  )
})

test('Likes count in blog', () => {
  const component = render(
    <SimpleBlog blog = {testBlog} />
  )

  const div = component.container.querySelector('.likes')
  expect(div).toHaveTextContent(
    `${testBlog.likes}`
  )
})

test('If there is two click on like button, event handler clicked twice', () => {
  const blog = {
    title: 'Like this blog twice',
    author: 'Testaaja',
    likes: 12
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog = {blog} onClick = {mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})