const xlsx = require("xlsx");

function autoParseAnyExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const range = xlsx.utils.decode_range(sheet["!ref"]);

  let headers = [];
  let dataStartRow = -1;

  // Находим строку с заголовками — первую "плотную"
  for (let row = range.s.r; row <= range.e.r; row++) {
    const rowValues = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      const addr = xlsx.utils.encode_cell({ r: row, c: col });
      const cell = sheet[addr];
      rowValues.push(cell ? String(cell.v).trim() : "");
    }

    const nonEmpty = rowValues.filter(Boolean).length;
    if (nonEmpty >= 2) {
      headers = rowValues.map(h => h || `Column_${Math.random().toString(36).slice(2, 6)}`);
      dataStartRow = row + 1;
      break;
    }
  }

  if (dataStartRow === -1) throw new Error("Не найдена строка с заголовками");

  const result = [];

  for (let row = dataStartRow; row <= range.e.r; row++) {
    const rowData = {};
    let empty = true;

    for (let col = range.s.c; col < headers.length; col++) {
      const addr = xlsx.utils.encode_cell({ r: row, c: col });
      const cell = sheet[addr];
      const key = headers[col];

      if (!key) continue;

      const val = cell ? cell.v : null;

      if (val !== null && val !== "") empty = false;
      rowData[key] = val;
    }

    if (!empty) result.push(rowData);
  }

  return result;
}

// Пример
const json = autoParseAnyExcel("Connect's Residents.xlsx");
console.log(JSON.stringify(json, null, 2));
