import React from 'react'

const Notification = ({message, error}) => {
  if(message === null && error === null) {
    return null
  } else if (message) {
    return (
      <div className="notification">
        {message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {error}
      </div>
    )
  }
}

export default Notification