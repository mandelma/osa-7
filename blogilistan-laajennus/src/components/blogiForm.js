import React from 'react'

const Blogi = (props) => {
  return(
    <div>
      <form onSubmit = {props.handleBlogi}>
        <h2>Create new blog</h2>
        <label>Title:<br/>
          <input {...props.title}></input><br/>
        </label>
        <label>Author:<br/>
          <input {...props.author}></input><br/>
        </label>
        <label>Url:<br/>
          <input {...props.url}></input><br/>
        </label>
        <label>Likes:<br/>
          <input {...props.likes}></input>
        </label><br/><br/>
        <button type = "submit">Create blog</button>
      </form>
    </div>
  )
}

export default Blogi