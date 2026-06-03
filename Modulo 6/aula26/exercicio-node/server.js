const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Read index.html
  fs.readFile('./index.html', 'utf8', (err, htmlData) => {
    if (err) {
      res.end('Error reading index.html');
      return;
    }

    // Read texto.txt
    fs.readFile('./texto.txt', 'utf8', (err, txtData) => {
      if (err) {
        // If texto.txt doesn't exist yet, just serve the HTML with placeholders removed or empty
        const finalHtml = htmlData
          .replace(/{{NUMBER}}/g, 'N/A')
          .replace(/{{COLOUR}}/g, '#000000');
        res.end(finalHtml);
      } else {
        // Parse texto.txt (assuming format: number\ncolour)
        const lines = txtData.split('\n');
        const number = lines[0] || 'N/A';
        const colour = lines[1] || '#000000';

        // Replace placeholders
        const finalHtml = htmlData
          .replace(/{{NUMBER}}/g, number)
          .replace(/{{COLOUR}}/g, colour);

        res.end(finalHtml);
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
