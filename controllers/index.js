import db from "../db.js"
import CustomNotFoundError from "../errors/CustomNotFoundError.js"

async function getIndex(_req, res) {
  const messages = await db.getMessages()

  if (!messages) {
    throw new CustomNotFoundError("Messages not found!")
  }

  res.render("index", { messages })
}

async function getNew(_req, res) {
  res.render("form")
}

async function createMessage(req, res) {
  const message = { ...req.body, added: new Date(), id: crypto.randomUUID() }

  await db.addMessage(message)

  res.redirect("/")
}

export { getIndex, getNew, createMessage }
