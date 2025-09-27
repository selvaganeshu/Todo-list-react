import React from 'react'

const List = ({ todos, handleEdit, handleDelete, editId, setEditId,editTitle,
  setEditTitle,editDescription,setEditDescription,handleEditCancel,handleUpdate}) => {
  return (
    <div className='list'>
      <ul>
        {todos.map((list) => {
          return (
            <li key={list._id}>
              <div className="container">
                {editId === list._id ? (
                  <div className='inputs'>
                    <input type="text" 
                    placeholder='title' 
                    value={editTitle}
                    onChange={(e)=> setEditTitle(e.target.value)}
                    />
                    <input type="text" 
                    placeholder='description'
                    value={editDescription}
                    onChange={(e)=> setEditDescription(e.target.value)}
                     />
                  </div>
                ) : (
                  <>
                    <div className="title">{list.title}</div>
                    <div className="description">{list.description}</div>
                  </>
                )}
              </div>

              <div className="buttons">

               { editId !== list._id ? 
               <>
                <button onClick={() => handleEdit(list)}>Edit</button>  
                <button onClick={() => handleDelete(list._id)}>Delete</button>
                </>
                :
                <>
                <button onClick={() => handleUpdate(list)}>Update</button>  
                <button onClick={() => handleEditCancel()}>Cancel</button>
                </>
             }
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default List
