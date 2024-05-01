import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import Document from "./schema.js"
import { v4 as uuidv4 } from "uuid"
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

app.get("/create", (req, res) => {
  try {
    const docId = uuidv4()
    res.send({ docId })
  } catch (error) {
    console.log(error)
    res.sendStatus(501)
  }
})

app.listen(port, () => {
  console.log(`Server started --> http://localhost:${port}`)
})
