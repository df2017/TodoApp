// middleware ...
const jwt = require('jsonwebtoken');

function autenticado(req, res, next) {
  
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, 'QWsaldpoicpwo20sd7890xbn223SsadcA', function (err, decoded) {
    if (err) {

      res.json({
        status: "error",
        message: err.message,
        data: null
      });
      
    } else {

      req.body.user = decoded.user;
      next();
    }
  })
}

module.exports = {
  autenticado: autenticado
}