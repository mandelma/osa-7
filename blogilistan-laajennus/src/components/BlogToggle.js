import React, { useState } from 'react'

const BlogToggle = (props, ref) => {

  const [ visible, setVisible ] = useState (false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div>
      <div onClick = {toggleVisibility} className = 'show'> {props.openBlog}
        <div style = {hideWhenVisible}></div>
      </div>
      <div style = {showWhenVisible} className = 'toggleContent'>
        {props.children}
      </div>
    </div>
  )
}

export default BlogToggle