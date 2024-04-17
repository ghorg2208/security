const logHeadersMiddleware = (req, res, next) => {
    console.log('Headers de la requête :', req.headers);
    next();
  };

  const firewallMiddleware = (req, res, next) => {
    const unrestrictedUrls = ['/hello', '/public'];
    const requestedUrl = req.url;
    const token = req.headers.authorization;
  
    if (unrestrictedUrls.includes(requestedUrl)) {
      // URL non restreinte, passer au prochain middleware
      next();
    } else if (token === 'valid_token') {
      // Token valide, passer au prochain middleware
      next();
    } else {
      // Accès refusé
      res.status(403).json({ message: 'Accès refusé' });
    }
  };