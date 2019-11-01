const homedir = require('os').homedir()
const home =  process.env.HOME || homedir
const path = require('path')
const todoList = path.join(home, '.todoList')
const fs = require('fs')
const db = require('./db')

module.exports.add = async (title) => {
  const list = await db.read()
  list.push({ title, done: false })
  await db.write(list)
}