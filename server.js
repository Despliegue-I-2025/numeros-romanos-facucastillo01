const express = require('express');
const { toRoman, fromRoman } = require('./index');
const app = express();

app.use(express.json());

// 🟩 Endpoint: arábigo → romano
// Ejemplo: /a2r?arabic=2025
app.get('/a2r', (req, res) => {
  const arabic = parseInt(req.query.arabic, 10);
  if (isNaN(arabic)) {
    return res.status(400).json({ error: 'Parámetro "arabic" requerido y debe ser numérico.' });
  }

  const result = toRoman(arabic);
  if (typeof result !== 'string' || result.includes('fuera de rango')) {
    return res.status(400).json({ error: result });
  }

  res.json({ roman: result });
});

// 🟨 Endpoint: romano → arábigo
// Ejemplo: /r2a?roman=MMXXV
app.get('/r2a', (req, res) => {
  const roman = req.query.roman;
  if (!roman) {
    return res.status(400).json({ error: 'Parámetro "roman" requerido.' });
  }

  const result = fromRoman(roman);
  if (typeof result !== 'number' || isNaN(result)) {
    return res.status(400).json({ error: result });
  }

  res.json({ arabic: result });
});

// 🟦 Ruta raíz
app.get('/', (req, res) => {
  res.send('✅ API Convertidor Romano funcionando correctamente');
});

// 🟢 Export para Vercel
module.exports = app;
