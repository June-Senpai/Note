import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import Document from "./schema.js"
import { v4 as uuidv4 } from "uuid"
import Delta from "quill-delta"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(DB_PASSWORD)

const port = 3000
app.get("/", (req, res) => {
  res.send("Hello World!")
})
// creating a uuid and sending it
app.get("/createDocumentID", (req, res) => {
  try {
    const docId = uuidv4()
    res.send({ docId })
  } catch (error) {
    console.log(error)
    res.sendStatus(501)
  }
})

app.get("/", async (req, res) => {
  const docs = await Document.find({}).exec()
  console.log({ docs })
  const docIds = docs.map((doc) => doc._id)
  res.send({ docIds })
})

// document update route
// app.post("/:docId", async (req, res) => {
//   try {
//     const { docId } = req.params
//     const { delta, oldDelta } = req.body
//     const doc = await Document.findOne({ _id: docId }).exec()
//     const deltaData = new Delta(oldDelta).compose(new Delta(delta))
//     if (!doc) {
//       await new Document({
//         _id: docId,
//         data: deltaData,
//         name: "Untitled",
//       }).save()
//     } else {
//       doc.data = deltaData
//       await doc.save()
//     }
//     res.sendStatus(204)
//   } catch (err) {
//     console.error(err)
//     res.sendStatus(501)
//   }
// })

// app.get("/:docId", async (req, res) => {
//   try {
//     const { docId } = req.params
//     const doc = await Document.findOne({ _id: docId }).exec()
//     const data = doc?.data
//     if (data) {
//       res.send({ data })
//     } else {
//       res.send({ msg: "Created" })
//     }
//   } catch (err) {
//     console.error(err)
//     res.sendStatus(501)
//   }
// })

app.get("/:docId", async (req, res) => {
  try {
    const { docId } = req.params
    res.send({ docId, message: "hi" })
    const doc = await Document.findOne({ _id: docId }).exec()
  } catch (error) {
    console.log(error)
    res.sendStatus(501)
  }
})

app.listen(port, () => {
  console.log(`Server started --> http://localhost:${port}`)
})
