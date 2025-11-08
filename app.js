import express from "express"
const app = express()
import indexRouter from "./routes"

app.use("/", indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${PORT}`)
})
