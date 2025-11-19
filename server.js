const express = require('express');
const cors = require('cors');
const { toRoman, fromRoman } = require('./index');
const app = express();

app.use(cors());
app.use(express.json());

// 🟩 a2r — número a romano
app.get('/a2r', (req, res) => {
  const arabic = parseInt(req.query.arabic, 10);

  if (isNaN(arabic)) {
    return res.status(400).json({ error: 'Parámetro "arabic" requerido y debe ser numérico.' });
  }

  const result = toRoman(arabic);

  if (typeof result !== "string" || result.includes("fuera de rango")) {
    return res.status(400).json({ error: result });
  }

  res.status(200).json({ roman: result });
});

// 🟨 r2a — romano a número
app.get('/r2a', (req, res) => {
  const roman = req.query.roman;

  if (!roman) {
    return res.status(400).json({ error: 'Parámetro "roman" requerido.' });
  }

  const result = fromRoman(roman);

  if (typeof result !== "number") {
    return res.status(400).json({ error: result });
  }

  res.status(200).json({ arabic: result });
});

// Ruta básica
app.get("/", (req, res) => {
  res.send("API Convertidor Romano funcionando");
});

// Exportar para Vercel
module.exports = app;
