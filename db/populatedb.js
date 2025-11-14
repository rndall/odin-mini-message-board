#! /usr/bin/env node

import { Client } from "pg"

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "user" VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
  messages (text, "user")
VALUES
  ('Hi there!', 'Amando'),
  ('Hello World!', 'Charles');
`

async function main() {
  console.log("seeding...")
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  await client.connect()

  try {
    await client.query(SQL)
    console.log("done")
  } catch (err) {
    console.error(err)
  } finally {
    await client.end()
  }
}

main()
