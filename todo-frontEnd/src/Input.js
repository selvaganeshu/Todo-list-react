import React from 'react'

const Input = ({title,setTitle,description,setDescription,handleSubmit}) => {
  return (
    <div className='input'>
        <form  onSubmit={(e)=> handleSubmit(e)}>
        <input 
        type="text" 
        placeholder='Title : ' 
        className='title'
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
         />
        <input 
        type="text" 
        placeholder='Description' 
        className='description'
        value = {description}
        onChange={(e)=> setDescription(e.target.value)}
        />
        <input 
        type="submit"
        className='submit'/>
        </form>
    </div>
  )
}

export default Input