const fs = require('fs-extra');
const path = require('path');

let text = fs.readFileSync(path.resolve(__dirname, './template/index.jsx'), { encoding: 'utf8' });
text = text.replace('ComponentName', 'taohaihui');
console.log(typeof text);
console.log(text);
console.log(text.includes('ComponentName'));