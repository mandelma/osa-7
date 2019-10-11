const blogs = [
  {
    title: 'Maanantai',
    author: 'A.B',
    url: 'http://www.maanantai.fi',
    likes: 11,
    user: {
      username: 'marman',
      name: 'Marko',
      id: '5d722eb5e81dc215d040f960'
    },
    id: '5d8c8ec115889d4f34bcf4a5'
  },
  {
    title: 'Tiistai',
    author: 'A.C',
    url: 'http://www.tiistai.fi',
    likes: 32,
    user: {
      username: 'marman',
      name: 'Marko',
      id: '5d722eb5e81dc215d040f960'
    },
    id: '5d8c8ef315889d4f34bcf4a6'
  },
  {
    title: 'Keskiviikko',
    author: 'A.D',
    url: 'http://www.keskiviikko.fi',
    likes: 43,
    user: {
      username: 'marman',
      name: 'Marko',
      id: '5d722eb5e81dc215d040f960'
    },
    id: '5d8c8f1915889d4f34bcf4a7'
  }
]

let token

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }