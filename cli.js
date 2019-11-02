#!/usr/bin/env node
const program = require('commander');
const api = require('./index')
const pkg = require('./package.json')

program
  .option('--version', 'lookup version')

program
  .version(pkg.version)

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const word = args.splice(1, args.length).join(' ')
    api.add(word).then(() => console.log('添加成功'), (err) => console.log(err))
  });
  
program
  .command('clear')
  .description('clear all task')
  .action(() => {
    api.clear().then(() => console.log('清除成功'), (err) => console.log(err))
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  api.showAll()
}
