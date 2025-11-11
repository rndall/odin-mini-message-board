import db from "../db.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"
import { MessagesSquare, Plus, ArrowLeft } from "lucide-static"

async function getIndex(_req, res) {
  const messages = await db.getMessages()

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
  res.render("form")
}

async function createMessage(req, res) {
  const message = { ...req.body, added: new Date(), id: crypto.randomUUID() }

  await db.addMessage(message)

  res.redirect("/")
}

export { getIndex, getMessageById, getNew, createMessage }
