import db from "../db/queries.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"
import { body, validationResult, matchedData } from "express-validator"
import { MessagesSquare, Plus, ArrowLeft } from "lucide-static"

const validateUser = [
  body("user").trim().notEmpty().withMessage("Name is required."),
  body("text").trim().notEmpty().withMessage("Message is required."),
]

async function getIndex(_req, res) {
  const messages = await db.getAllMessages()

  if (!messages) {
    throw new CustomNotFoundError("Messages not found!")
  }

  const messagesFormattedDate = messages.map((m) => {
    const date = new Date(m.added)
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    return { ...m, added: formatted }
  })

  res.render("index", {
    messages: messagesFormattedDate,
    MessagesSquare,
    Plus,
    details: false,
  })
}

async function getMessageById(req, res) {
  const { id } = req.params

  const message = await db.getMessageById(id)

  if (!message) {
    throw new CustomNotFoundError("Message not found!")
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  })
  let formattedTimestamp = formatter.format(new Date(message.added))
  formattedTimestamp = formattedTimestamp.replace(", ", " at ")
  const messageFormattedTimestamp = { ...message, added: formattedTimestamp }

  res.render("message", { message: messageFormattedTimestamp, ArrowLeft })
}

async function getNew(_req, res) {
  res.render("createUser")
}

const createMessage = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        errors: errors.array(),
        message: { ...req.body },
      })
    }
    const { user, text } = matchedData(req)
    await db.insertMessage({ user, text })
    res.redirect("/")
  },
]

export { getIndex, getMessageById, getNew, createMessage }
