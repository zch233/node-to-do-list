const homedir = require('os').homedir()
const home =  process.env.HOME || homedir
const path = require('path')
const fs = require('fs')


const add = {
  handleFilePath(filePath) {
    return path.join(filePath || home, '.todoList')

  },
  read(filePath) {
    return new Promise((s,r) => {
      fs.readFile(add.handleFilePath(filePath), { flag: 'a+' }, (err, data) => {
        if (err) return r(err)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (err) {
          list = []
        }
        s(list)
      })
    })
  },
  write(list, filePath) {
    return new Promise((s,r) => {
      fs.writeFile(add.handleFilePath(filePath), JSON.stringify(list) + '\n', (err) => {
        if (err) return r(err)
      })
    })
  }
}

module.exports = add