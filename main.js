const { program } = require('commander');
const fs = require('fs');

program
  .option('-i, --input <path>', 'шлях до JSON файлу для читання')
  .option('-o, --output <path>', 'шлях для запису результату')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const result = "OK";

if (!options.display && !options.output) {
  process.exit(0);
}

if (options.display) {
  console.log(result);
}

if (options.output) {
  fs.writeFileSync(options.output, result, 'utf-8');
}
