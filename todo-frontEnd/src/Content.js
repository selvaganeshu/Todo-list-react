import React from 'react'

const Content = ({message,error,deleteMessage,updateMessage}) => {
  return (
    <div className='Content'>
        <h3>Add Item</h3>
        { message && 
        <h4 className='message'>{message}</h4>} 
        {
          updateMessage &&
          <h4 className='update'>{updateMessage}</h4>
        }
        {
          deleteMessage &&
          <h4 className='delete'>{deleteMessage}</h4>
        }
        {
          error && 
          <h4 className='error'>{error}</h4>
        }
    </div>
  )
}

export default Content