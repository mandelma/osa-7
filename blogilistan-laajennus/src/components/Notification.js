import React from 'react'

const Notification = ({ msg,  msgType }) => {
  let messType
  /* if(msgType.message === null && msgType.errMesssage === null ){
    messType = ''
  } */
  if(msgType.errMessage !== null){
    //return null
    messType = 'err'
  }
  else if(msgType.errMessage === null && msgType.message !== null){
    messType = 'message'
  }
  else{
    messType = ''
  }
  return <div className = {messType}>
    {msg}
  </div>
}

export default Notification