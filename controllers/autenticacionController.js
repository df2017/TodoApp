//const service = require('../middlewares/middlewares')
const jwt = require('jsonwebtoken');


const users = [{
    "user": "diego",
    "password": "123456"
}];

function login(req, res) {

    let username = users.find((x) => x.user == req.body.user);

    if (req.body.user === username.user && req.body.password === username.password) {
        const payload = {
            user: req.body.user
        };

        jwt.sign(payload, 'QWsaldpoicpwo20sd7890xbn223SsadcA', (error, token) => {

            if(error) {
                res.status(500).send("No es posible iniciar sesion.");
                return;
            }
    
            let resultado = {
                usuario: req.body.user,
                token: token
            };
    
            res.send(resultado);
    
        })
    
    } else {
        res.send({
            mensaje: "Usuario o contraseña incorrectos"
        })
    }

};

module.exports = {
    login: login,
}