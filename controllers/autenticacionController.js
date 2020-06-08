//const service = require('../middlewares/middlewares')
const jwt = require('jsonwebtoken');


const users = [{
    "user": "diego",
    "password": "123456"
}];

const tokenid = [];

function login(req, res) {

    let user = users.find((x) => x.user == req.body.user.toLowerCase());

    if (req.body.user === user.user && req.body.password === user.password) {
        const payload = {
            user: req.body.user
        };
        const token = jwt.sign(payload, 'QWsaldpoicpwo20sd7890xbn223SsadcA', {
            expiresIn: 1440
        });
        tokenid.push(token)
        res.send({
            mensaje: 'Autenticación correcta',
            token: token
        });
        return;
    } else {
        res.send({
            mensaje: "Usuario o contraseña incorrectos"
        })
        return;
    }

};

module.exports = {
    login: login,
    tokenid: tokenid,
}