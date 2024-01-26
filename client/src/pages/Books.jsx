import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Books = () => {
  const [books,setBooks] = useState([]);

  useEffect(()=>{
    const fetchAllBooks = async ()=>{
      try {
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllBooks();
  })

const handleDelete = async (id) =>{
  try {
    await axios.delete("http://localhost:8800/books/"+id);
    alert("Successfully deleted!!");
    // window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

  return (
    <div>
      <h1 className='title'>Book Shop</h1>
      <div className='books flex gap-3'>{books.map(book=>(
        <div className='book flex-1 flex flex-col gap-3 items-center' key={book.id}>
            {book.cover && <img src={book.cover} className=' rounded-md' alt=''/>}
            <h2 className=' text-xl font-bold'>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className='delete text-red-500 flex bg-transparent flex-row gap-1 justify-center items-center border-red-500 hover:bg-red-500 hover:shadow-md hover:shadow-red-400' onClick={()=>handleDelete(book.id)}>Delete <FaTrash size={16}/></button>
            <button className='update border-none'><Link className=' flex flex-row gap-1 justify-center items-center' to={`/update/${book.id}`}>Update <FaEdit size={16}/></Link></button>
        </div>
      ))}
      </div>
      <button className=' m-5 bg-white text-black border-none hover:bg-black hover:text-white hover:shadow-md hover:shadow-neutral-800'>
        <Link to={"/add"}>Add new Book</Link>
      </button>
    </div>
  )
}

export default Books