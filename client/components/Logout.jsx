import React from 'react'
import {connect} from 'react-redux'

import {logoutUser} from '../actions/logout'

const Logout = (props) => {
  return (
    <div>
      <p>Welcome back: {props.user}</p>
      <button onClick={props.logoutUser}>
            Logout
      </button>
    </div>
    
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser())
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)