import { Router } from "express"
import { getIndex, getNew, createMessage } from "../controllers/index.js"

const indexRouter = Router()

indexRouter.get("/", getIndex)
indexRouter.get("/new", getNew)
indexRouter.post("/new", createMessage)

export default indexRouter
