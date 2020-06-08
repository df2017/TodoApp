const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.set('secretKey', 'QWsaldpoicpwo20sd7890xbn223SsadcA');

const tareaController = require('./controllers/tareaController');
const autenticacionController = require('./controllers/autenticacionController');
const middleware = require('./middlewares/middlewares');
const path = require('path');

// app config
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.get("/api/v1/tasks", middleware.autenticado, tareaController.obtenerTareas);
app.post("/api/v1/tasks", middleware.autenticado, tareaController.guardarTarea);
app.put("/api/v1/tasks/:id", middleware.autenticado, tareaController.actualizarTareas);
app.delete("/api/v1/tasks/:id", middleware.autenticado, tareaController.eliminarTarea);

app.post("/api/v1/auth", autenticacionController.login);
// server config.
const port =  process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App todo iniciada en el puerto ${port}`);
});