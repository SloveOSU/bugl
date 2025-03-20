import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

// setup database URL
const url = 'mongodb://localhost:27017'

// set database name
const dbName = 'ch2'

// create database object
const client = new MongoClient(url)

try {
  await client.connect() // connect to mongo url
  console.log('Successfully connected to Database!')
} catch (err) {
  console.log('DB Error: something went wrong!', err)
}

const server = createServer(async (req, res) => {
  const db = client.db(dbName) // connect to database
  const users = db.collection('users') // set to users collection
  const usersList = await users.find()

  console.log('type of usersList', typeof usersList)

  usersList.toArray() // use find all and then set to array

  res.statusCode = 200 // set status code
  res.setHeader('Content-Type', 'application/json') // set header
  res.end(JSON.stringify(usersList)) // return array as json object
})

const host = 'localhost'
const port = 3000
server.listen(port, host, () => {
  console.log(`server listening on http://${host}:${port}`)
})
