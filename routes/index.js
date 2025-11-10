import { Router } from "express"
import {
  getIndex,
  getMessageById,
  getNew,
  createMessage,
} from "../controllers/index.js"

const indexRouter = Router()

indexRouter.get("/", getIndex)
indexRouter.get("/new", getNew)
indexRouter.get("/:id", getMessageById)
indexRouter.post("/new", createMessage)

export default indexRouter
