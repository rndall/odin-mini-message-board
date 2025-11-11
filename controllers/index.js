import db from "../db.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"
import { MessagesSquare, Plus } from "lucide-static"

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

  res.render("index", { messages: messagesFormattedDate, MessagesSquare, Plus })
}

async function getMessageById(req, res) {
  const { id } = req.params

  const message = await db.getMessageById(id)

  if (!message) {
    throw new CustomNotFoundError("Message not found!")
  }

  res.render("message", { message })
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
