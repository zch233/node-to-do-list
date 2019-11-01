const homedir = require('os').homedir()
const home =  process.env.HOME || homedir
const path = require('path')
const todoList = path.join(home, '.todoList')
const fs = require('fs')

module.exports.add = (title) => {
  // 读取文件
  fs.readFile(todoList, { flag: 'a+' }, (err, data) => {
    if (err) return
    let list
    try {
      list = JSON.parse(data.toString())
    } catch (err) {
      list = []
    }
    // 写入文件
    list.push({ title, done: false })
    fs.writeFile(todoList, JSON.stringify(list) + '\n', (err) => {
      if (err) return
    })
  })
}