import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book,setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook(prev=>({...prev,[e.target.name]: e.target.value }));
  }

  const handleClick = async(e) =>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  console.log(book);
  return (
    <div className='form h-screen'>
      <h1 className='title'>Add New Book</h1>
      <div className='main flex flex-col justify-center gap-5 items-center'>
        <input type="text" placeholder='title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>
        <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
        <button className=' flex justify-center items-center w-28' onClick={handleClick}>Add</button>
      </div>

    </div>
  )
}

export default Add