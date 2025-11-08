import db from "../db.js"

async function getIndex(_req, res) {
  const messages = await db.getMessages()
  res.render("index", { messages })
}

async function getNew(_req, res) {
  res.render("form")
}

export { getIndex, getNew }
