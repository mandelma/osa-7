import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  let msgType

  const message = props.msg === null ?
    props.errMsg : props.msg

  if(props.errMsg !== null){
    msgType = 'err'
  }
  else if(props.errMsg === null && props.msg !== null){
    msgType = 'message'
  }
  else{
    msgType = ''
  }

  return <div className = {msgType}>
    {message}
  </div>
}

const mapStateToProps = (state) => {
  return{
    msg: state.message,
    errMsg: state.errMessage
  }
}

export default connect(
  mapStateToProps
)(Notification)