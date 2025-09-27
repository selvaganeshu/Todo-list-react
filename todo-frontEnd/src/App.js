import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Input from "./Input";
import List from "./List";
import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error,setError] = useState('');
  const [deleteMessage,setDeleteMessage] = useState('');
  const [updateMessage,setUpdateMessage] = useState('');
  const [message, setMessage] = useState("");
  const [editTitle,setEditTitle] = useState('');
  const [editDescription,setEditDescription] = useState('');
  const [editId,setEditId] = useState(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const fetchItems = await fetch("http://localhost:4000/todos");
      const items = await fetchItems.json();
      setTodos(items);
    };
    getItems();
  }, [todos]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if(res.ok){
        setTodos([...todos, { title, description }]);
        setTitle("");
        setDescription("");
        setMessage("Item Added Successfully");
        setTimeout(()=>{
          setMessage("");
        },2000)
        setError('');
    }
    else{
      setError('Could not Add Data');
    }
    }
    catch(error){
    console.log("error :"+error);
  }
  }
  
  const handleEdit = (list)=>{
    setEditId(list._id);
    setEditTitle(list.title);
    setEditDescription(list.description);
  }
  const handleEditCancel = ()=>{
    setEditId(0);
  }
  const handleUpdate = async(list)=>{
    try{
      const res = await fetch(`http://localhost:4000/todos/${list._id}`,{
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title: editTitle,description:editDescription})
      })
      if(res.ok){
        const updatedList = todos.map((item)=>{
          if(item._id === editId){
            item.title = editTitle
            item.description = editDescription
          }
          return item;
        })
        setTodos(updatedList);
        setUpdateMessage('Item Updated Successfully');
        setTimeout(()=>{
          setUpdateMessage('');
        },3000)
        setEditId(0);
    }
    }catch(err){
      console.log(err);
    }
  }
  const handleDelete = async(id)=>{
    try{
      await fetch(`http://localhost:4000/todos/${id}`,{
        method : 'DELETE'
      })
      const updatedTodos = todos.filter((item)=> item._id !== id);
      setTodos(updatedTodos);
      setDeleteMessage('Item Deleted Successfully');
      setTimeout(()=>{
        setDeleteMessage("");
      },3000);

    }catch(err){
      setError('Error in Delete');
    }
  }

  return (
    <div className="App">
      <Header />
      <Content 
      message={message}
      error =  {error}
      deleteMessage={deleteMessage}
      updateMessage = {updateMessage}
       />
      <Input
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
      <List 
      todos={todos}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
      editId = {editId}
      setEditId = {setEditId}
      editTitle = {editTitle}
      setEditTitle = {setEditTitle}
      editDescription = {editDescription}
      setEditDescription = {setEditDescription}
      handleEditCancel ={handleEditCancel}
      handleUpdate = {handleUpdate}
       />
    </div>
  );
}

export default App;
