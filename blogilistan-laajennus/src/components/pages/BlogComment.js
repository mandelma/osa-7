import React from 'react'

const Comments = ({ blogs , id, addcomment }) => {

  return (
    <div>
      {blogs.filter(b => b.id === id).map(item =>
        item.comments.map(c =>
          <li key = {c.id}>
            {c.comment}
          </li>
        ))}
    </div>
  )
}


export default Comments