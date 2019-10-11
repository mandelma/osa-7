import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Log in to application:')
    )

    expect(component.container).not.toHaveTextContent('Maanantai')
    expect(component.container).not.toHaveTextContent('Tiistai')
    expect(component.container).not.toHaveTextContent('Keskiviikko')
  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      name: 'Testaaja Tester',
      token: '1231231214'
    }

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText(`${user.name} logged in`))

    expect(component.container).toHaveTextContent('Maanantai')
    expect(component.container).toHaveTextContent('Tiistai')
    expect(component.container).toHaveTextContent('Keskiviikko')
  })
})