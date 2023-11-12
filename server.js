const express = require("express")
const app = express()
const conectionDB = require("./database/db")
const bookeRoutes = require("./routes/bookeRoutes")
require("dotenv").config()
const port = process.env.PORT || 3030

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bookeRoutes)
conectionDB()

app.listen(port, ()=> {
  console.log("server is running on PORT " + port)
})