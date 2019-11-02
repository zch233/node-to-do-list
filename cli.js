const program = require('commander');
const api = require('./index')

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

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
