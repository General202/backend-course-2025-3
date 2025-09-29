const { program } = require('commander');
const fs = require('fs');

program
  .option('-i, --input <path>', 'шлях до JSON файлу для читання')
  .option('-o, --output <path>', 'шлях для запису результату')
  .option('-d, --display', 'вивести результат у консоль')
  .option('-m, --mfo', 'відображати код МФО перед назвою банку')
  .option('-n, --normal', 'відображати лише банки з COD_STATE = 1 (нормальні)');

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

let fileContent;
try {
  fileContent = fs.readFileSync(options.input, 'utf-8');
} catch (err) {
  console.error("Error reading file:", err.message);
  process.exit(1);
}

let jsonData;
try {
  jsonData = JSON.parse(fileContent);
} catch (err) {
  console.error("Error parsing JSON:", err.message);
  process.exit(1);
}

if (!Array.isArray(jsonData)) {
  console.error("Невірний формат JSON — очікується масив об'єктів");
  process.exit(1);
}

let filteredData = jsonData;
if (options.normal) {
  filteredData = filteredData.filter(item => String(item.COD_STATE) === "1");
}

const resultLines = filteredData.map(item => {
    const mfo = item.MFO || item.ID_NBU || ''; // якщо MFO немає, пробуємо ID_NBU
  const name = item.SHORTNAME || item.FULLNAME || 'Назва відсутня';
  const mfoPart = options.mfo ? `${mfo} ` : '';
  return `${mfoPart}${name}`;
});

const result = resultLines.join('\n');

if (!options.display && !options.output) {
  process.exit(0);
}

if (options.display) {
  console.log(result);
}

if (options.output) {
  try {
    fs.writeFileSync(options.output, result, 'utf-8');
  } catch (err) {
    console.error("Error writing to file:", err.message);
    process.exit(1);
  }
}
