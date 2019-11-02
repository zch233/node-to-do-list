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
    .then(answers1 => {
      if (answers1.value === 'new') {
        inquirer
          .prompt({
            type: 'input',
            name: 'value',
            message: '请输入待办任务'
          })
          .then(async title => {
            await this.add(title.value).then(() => console.log('添加成功'), (err) => console.log(err))
          })
      } else if (answers1.value === 'quit') {
        console.log('已退出')
      } else {
        inquirer
          .prompt({
            type: 'list',
            name: 'value',
            message: '请选择您的操作?',
            choices: [
              { name: '修改', value: 'modify' },
              { name: '已完成', value: 'done' },
              { name: '删除', value: 'delete' },
              new inquirer.Separator(),
              { name: '退出', value: 'quit' }
            ]
          })
          .then(async answers2 => {
            if (answers2.value === 'modify') {
              inquirer
                .prompt({
                  type: 'input',
                  name: 'value',
                  message: '请输入修改后的待办事项'
                })
                .then(async title => {
                  list[answers1.value].title = title.value
                  await db.write(list)
                  console.log('修改成功')
                })
            } else if (answers2.value === 'done') {
              list[answers1.value].done = true
              await db.write(list)
              console.log('已经标记为完成')
            } else if (answers2.value === 'delete') {
              list.splice(answers1.value, 1)
              await db.write(list)
              console.log('已删除')
            } else if (answers2.value === 'quit') {
              console.log('已退出')
            }
          })
      }
    });
}