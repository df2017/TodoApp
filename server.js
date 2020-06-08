const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.set('secretKey', 'QWsaldpoicpwo20sd7890xbn223SsadcA');

const tareaController = require('./controllers/tareaController');
const autenticacionController = require('./controllers/autenticacionController');
const middleware = require('./middlewares/middlewares');
const path = require('path');


app.use(express.static(path.join(__dirname, 'src')))

// app config
app.use(bodyParser.json());
app.use(cors());

// rutas.
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/templates/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname + '/templates/login.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname + '/templates/index.html'));
});


app.post("/auth", autenticacionController.login);

app.get("/tasks", middleware.autenticado, tareaController.obtenerTareas);
app.post("/tasks", middleware.autenticado, tareaController.guardarTarea);
app.put("/tasks/:id", middleware.autenticado, tareaController.actualizarTareas);
app.delete("/tasks/:id", middleware.autenticado, tareaController.eliminarTarea);

// server config.
const port = 8000;

app.listen(port, () => {
  console.log(`App todo iniciada en el puerto ${port}`);
});