#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');

program
  .option('-i, --input <path>', 'шлях до JSON файлу для читання')
  .option('-o, --output <path>', 'шлях для запису результату')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();

// ✅ Перевірка, чи передано -i
if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// ✅ Перевірка чи файл існує
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// ✅ Поки що просто заглушка (бо в ЧАСТИНІ 1 ми не читаємо JSON)
const result = "OK";

// ✅ Якщо нема -d і нема -o → нічого не виводити
if (!options.display && !options.output) {
  process.exit(0);
}

// ✅ Якщо є display → вивести
if (options.display) {
  console.log(result);
}

// ✅ Якщо є output → записати у файл
if (options.output) {
  fs.writeFileSync(options.output, result, 'utf-8');
}
