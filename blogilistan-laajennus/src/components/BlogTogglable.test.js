import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogToggle from './BlogToggle'

describe('<BlogTogglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <BlogToggle openBlog = 'open...'>
        <div className = 'testDiv' />
      </BlogToggle>
    )
  })

  test('renders the children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at the start children are not displayed', () => {
    const div = component.container.querySelector('.toggleContent')
    expect(div).toHaveStyle('dispaly: none')
  })

  test('after clicking in title, childrea are displayed', () => {
    const open = component.getByText('open...')
    fireEvent.click(open)

    const div = component.container.querySelector('.toggleContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('cliking in title again, children will be closed', () => {
    const close = component.getByText('open...')
    fireEvent.click(close)
    fireEvent.click(close)

    const div = component.container.querySelector('.toggleContent')
    expect(div).toHaveStyle('display: none')
  })
})