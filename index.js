const db = require('./db')
const inquirer = require('inquirer');

module.exports.add = async (title) => {
  if (title === '') return Promise.reject('error：请输入待办事项');
  const list = await db.read()
  list.push({ title, done: false })
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

module.exports.showAll = async () => {
  const list = await db.read()
  inquirer
    .prompt({
        type: 'list',
        name: 'value',
        message: '查看待办事项',
        choices: [
          ...list.map((item, index) => { return {name: `${item.done ? '[x]' : '[_]'} ` + item.title, value: index }}),
          new inquirer.Separator(),
          { name: '创建新任务', value: 'new' },
          { name: '退出', value: 'quit' }
        ]
      })
    .then(answers => {
      console.log(answers.value)
    });
}