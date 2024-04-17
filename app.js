const express = require('express');
const app = express();

// Middleware pour vérifier le token
const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  if (token === '42') {
    next(); // Accès autorisé
  } else {
    res.status(403).json({ message: 'Accès refusé' }); // Accès refusé
  }
};

// Route GET /hello
app.get('/hello', (req, res) => {
  res.send('<h1>hello</h1>');
});

// Route GET /restricted1
app.get('/restricted1', authMiddleware, (req, res) => {
  res.json({ message: 'topsecret' });
});

// Route GET /restricted2
app.get('/restricted2', authMiddleware, (req, res) => {
  res.send('<h1>Admin space</h1>');
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});