const fs = require('fs');
const path = require('path');
const files = ['audio.js', 'engine.js', 'data.js', 'assets.js', 'entities.js', 'main.js'];
for (const file of files) {
  try {
    const code = fs.readFileSync(path.join(__dirname, file), 'utf8');
    // Parse using Function constructor or vm
    new Function(code);
    console.log(file + ' syntax OK');
  } catch(e) {
    console.log(file + ' ERROR: ' + e.message);
  }
}
