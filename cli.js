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
    api.add(word)
  });

program.parse(process.argv);
