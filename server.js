const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const authRoutes = require("./routes/authRoutes")
const eventsRoutes = require("./routes/eventsRoutes")
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/auth", authRoutes)
app.use("/api/events", eventsRoutes)
const PORT = 4000

app.get("/", (req,res)=>{ 
  res.send(`Welcome to Janet's server`)
})

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})