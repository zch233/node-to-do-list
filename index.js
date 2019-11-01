const homedir = require('os').homedir()
const home =  process.env.HOME || homedir
const path = require('path')
const todoList = path.join(home, '.todoList')
const fs = require('fs')
const add = require('./add')

module.exports.add = async (title) => {
  const list = await add.read()
  list.push({ title, done: false })
  await add.write(list)
}