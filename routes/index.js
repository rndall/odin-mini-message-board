import { Router } from "express"
import { getIndex, getNew } from "../controllers/index.js"

const indexRouter = Router()

indexRouter.get("/", getIndex)
indexRouter.get("/new", getNew)

export default indexRouter
