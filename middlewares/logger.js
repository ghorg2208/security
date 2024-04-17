const express = require('express');
const app = express();
const port = 3000;

// Liste des URL publiques
let publicUrls = ['/url1', '/url2', '/login'];

// Middleware pour afficher les en-têtes de la requête
const logHeadersMiddleware = (req, res, next) => {
  console.log('Headers de la requête :', req.headers);
  next();
};

// Middleware "firewall"
function myMiddleware(req, res, next) {
  const requestedUrl = req.url;
  const token = req.headers.authorization;

  if (publicUrls.includes(requestedUrl)) {
    // URL publique, passer au prochain middleware
    next();
  } else {
    // URL privée, vérifier l'authentification
    if (token === '42') {
      // Token valide, passer au prochain middleware
      next();
    } else {
      // Accès refusé
      res.status(403).send('Accès refusé');
    }
  }
}

// Utiliser les middlewares
app.use(logHeadersMiddleware);
app.use(myMiddleware);

// Route pour générer un token
app.post('/login', (req, res) => {
  res.json({ token: '42' }); // Générer un token unique !!
  // et renvoyer par cookie
});

// Routes publiques
app.get('/url1', (req, res) => {
  res.send('Hello World!');
});

app.get('/url2', (req, res) => {
  res.send('Hello World!');
});

// Route privée
app.get('/private/url1', (req, res) => {
  res.send('Hello it is secret');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
