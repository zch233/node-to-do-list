const db = require('./db')
const inquirer = require('inquirer');

module.exports.addOrModify = async (title, index) => {
  if (title === '') return Promise.reject('error：请输入待办事项');
  const list = await db.read()
  index === undefined ? list.push({ title, done: false }) : (list[index].title = title)
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

module.exports.showAll = async () => {
  const list = await db.read()
  var showAll = new ShowAll()
  showAll.showAllList(list)
    .then(answers1 => {
      if (answers1.value === 'new') {
        showAll.askForCreate()
          .then(async title => {
            await this.addOrModify(title.value).then(() => console.log('添加成功'), (err) => console.log(err))
          })
      } else if (answers1.value === 'quit') {
        console.log('已退出')
      } else {
        showAll.showSingleList()
          .then(answers2 => {
            showAll.actionMap[answers2.value] && showAll.actionMap[answers2.value].call(showAll, list, answers1, this.addOrModify)
          })
      }
    });
}

function ShowAll() {}
ShowAll.prototype = {
  askForCreate(name = 'value', message = '请输入待办任务') {
    return inquirer
      .prompt({
        type: 'input',
        name,
        message
      })
  },
  showAllList(list, name = 'value', message = '查看待办事项') {
    return inquirer
      .prompt({
        type: 'list',
        name,
        message,
        choices: [
          ...list.map((item, index) => { return {name: `${item.done ? '[x]' : '[_]'} ` + item.title, value: index }}),
          new inquirer.Separator(),
          { name: '创建新任务', value: 'new' },
          { name: '退出', value: 'quit' }
        ]
      })
  },
  showSingleList(name = 'value', message = '请选择您的操作?') {
    return inquirer
      .prompt({
        type: 'list',
        name,
        message,
        choices: [
          { name: '修改', value: 'modify' },
          { name: '已完成', value: 'done' },
          { name: '删除', value: 'delete' },
          new inquirer.Separator(),
          { name: '退出', value: 'quit' }
        ]
      })
  },
  actionMap: {
    modify(list, answers, addOrModify) {
      this.askForCreate()
        .then(async title => {
          addOrModify(title.value, answers.value)
          console.log('修改成功')
        })
    },
    async done(list, answers) {
      list[answers.value].done = true
      await db.write(list)
      console.log('已完成')
    },
    async delete(list, answers) {
      list.splice(answers.value, 1)
      await db.write(list)
      console.log('已删除')
    },
    quit() {
      console.log('已退出')
    }
  }
}