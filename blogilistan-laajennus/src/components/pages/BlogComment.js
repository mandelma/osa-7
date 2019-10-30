import React from 'react'

const Comments = ({ blogs , id, addcomment }) => {

  return (
    <div>
      <ul>
        {blogs.filter(b => b.id === id).map(item =>
          item.comments.map(c =>
            <li key = {c.id}>
              {c.comment}
            </li>
          ))}
      </ul>
    </div>
  )
}


export default Comments