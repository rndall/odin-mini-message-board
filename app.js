import express from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

import indexRouter from "./routes/index.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ejs
app.set("views", join(__dirname, "views"))
app.set("view engine", "ejs")

app.use("/", indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${PORT}`)
})
