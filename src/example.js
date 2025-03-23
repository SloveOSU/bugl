import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

console.log('running example.js')

// The initDatabase() function we defined earlier is an async function,
// so we need to await it; otherwise,
// we would be attempting to access the database before we are connected to it:
await initDatabase()

const post = new Post({
  title: 'hello Mongoose!',
  author: 'Josiah',
  contents: 'I am from the kingdom!!',
  tags: ['Mongoose', 'mongodb'],
})

// save post in database
//await post.save()

const createdPost = await post.save()

await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hello again, Mongoose!' },
})

// find all posts
const posts = await Post.find()

// display all posts
console.log(posts)
