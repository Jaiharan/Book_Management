import express from "express";
import mysql from 'mysql2';
import cors from 'cors';
import env from 'env';

const port = 8800;
const app = express()
const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: process.env.MYSQL_CONNECTION_PASSWORD,
  database:"test"
});

// if there is a auth problem 
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';
// or npm i sql2

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=> {
  res.json("Hello this is backend");
})

app.get("/books",(req,res)=>{
  const q = "SELECT * FROM books"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data);
  });
});

// to get data of single book using bookid
app.get("/books/:id",(req,res)=>{
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?"
  db.query(q,[bookId],(err,data)=>{
    if(err) return res.json(err)
    return res.json(data);
  });
});

app.post("/books",(req,res)=>{
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ]
  db.query(q,[values],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Book has been created successfully");
  })
});

app.delete("/books/:id",(req,res)=>{
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?"

  db.query(q,[bookId], (err,data)=>{
    if(err) return res.json(err)
    return res.json("Book has been deleted successfully");
  })
});


app.put("/books/:id",(req,res)=>{
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?"

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ]

  db.query(q,[...values,bookId], (err,data)=>{
    if(err) return res.json(err)
    return res.json("Book has been Updated successfully");
  })
});

app.listen(port, ()=>{
  console.log(`Server Connected to port:${port}`);
});