import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(DB_PASSWORD)

const port = 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Server started --> http://localhost:${port}`)
})