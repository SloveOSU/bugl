import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'

const server = createServer((req, res) => {
  res.statusCode = 200

  res.setHeader('Content-Type', 'application/json')

  const users = readFileSync('./backend/users.json')

  res.end(users)
})

const host = 'localhost'
const port = 3000

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
