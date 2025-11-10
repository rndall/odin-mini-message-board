const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    id: crypto.randomUUID(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id: crypto.randomUUID(),
  },
]

async function getMessages() {
  return messages
}

async function addMessage(message) {
  messages.push(message)
}

export default { getMessages, addMessage }
