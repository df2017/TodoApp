
let tareas = [];
let idTarea = 0;

function obtenerTareas(req, res) {
    res.send(tareas);
}

function guardarTarea(req, res) {
    
    let tarea = req.body;

    // validamos tarea.
    if (!tarea.descripcion) {
        res.status(400).send("informacion incompleta");
        return;
    }

    tarea.estado = "pendiente";
    tarea.id = ++idTarea;
    tareas.push(tarea);

    res.send("La tarea se guardo correctamente.");
}

function actualizarTareas(req, res) {
    
  let task = tareas.find((x) => x.id == req.params.id);

  if (!req.body) {
    res.status(400).send("Datos no validos.");
    return;
  }

  for (let key in task) {
    if (req.body[key]) {
      task[key] = req.body[key]
    }
  }
  res.send((req.body));
  
}

function eliminarTarea(req, res) {
    let id = req.params.id;

    let indice = tareas.findIndex((x) => x.id == id);

    if (indice < 0) {
        res.status(404).send("La tarea buscada no existe");
        return;
    }

    tareas.splice(indice, 1);
    res.status(204).json();
}

module.exports = {
    obtenerTareas: obtenerTareas,
    guardarTarea: guardarTarea,
    actualizarTareas: actualizarTareas,
    eliminarTarea: eliminarTarea
}