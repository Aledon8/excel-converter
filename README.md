# excel-converter
---

````
# 📊 AutoParseAnyExcel

A lightweight Node.js utility for **automatically parsing `.xlsx` Excel files** into JSON — no manual configuration or header definition required.

---

## 🚀 Features

- Automatically detects the **first row with headers** (row with at least 2 non-empty cells).
- Parses all rows below the header as data rows.
- Supports **incomplete or sparse rows**.
- Reads data from the **first sheet only**.
- Assigns random column names like `Column_ab12` to unnamed headers.

---

## 📦 Installation

```bash
npm install xlsx
````

---

## 📁 Usage

```js
const autoParseAnyExcel = require('./yourFile.js'); // Replace with actual filename

const data = autoParseAnyExcel('path/to/your/file.xlsx');
console.log(JSON.stringify(data, null, 2));
```

---

## 🧠 How it works

1. Loads the `.xlsx` file using the [`xlsx`](https://www.npmjs.com/package/xlsx) library.
2. Scans for the first row with **≥ 2 non-empty cells** — assumes it's the header.
3. Maps headers and reads all subsequent rows.
4. Returns an array of objects, where each object is a row keyed by the headers.

---

## 📌 Output Example

```json
[
  {
    "Name": "Alice",
    "Age": 30,
    "City": "New York"
  },
  {
    "Name": "Bob",
    "Age": 25,
    "City": "San Francisco"
  }
]
```

---

## ⚠️ Error Handling

If no header row is found, the function throws:

```bash
Error: Не найдена строка с заголовками
```

> Translation: “Header row not found”

---

## 🔧 Developer Notes

* Only the **first worksheet** is parsed.
* Empty cells are stored as `null`.
* You can extend this to support multiple sheets, CLI input, or export to JSON files.

---

## 📝 License

MIT — Free to use, modify, and share.

---
```
