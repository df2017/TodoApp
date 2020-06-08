let taskTable = document.getElementById("taskTable");
let inputTask = document.getElementById("addTask");

let addButton = document.querySelector("button.btn.btn-primary");
addButton.addEventListener("click", addTask);

window.addEventListener("load", () => {

  let token = localStorage.getItem("token");

  if(!token) {
    window.location.href = "/login";
  }
})

function dateFull() {

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date();

  let dayName = days[d.getDay()];
  let date = d.getDate();
  let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  let year = d.getFullYear();
  let dateStr = `${dayName}  ${date}-${month}-${year}`

  return dateStr
}

document.getElementById("date-time").textContent = dateFull();

// Create rows table
let tableTask = (tasks) => {
  let tbody = taskTable.getElementsByTagName("tbody")[0];
  let tbodyNew = document.createElement("tbody");

  tasks.forEach((elem, i) => {

    let tr = tbodyNew.insertRow(i);

    let tdTasks = tr.insertCell(0);
    tdTasks.className = "text-center";
    tdTasks.innerText = elem.descripcion;

    let tdStatus = tr.insertCell(1);
    tdStatus.className = "text-center";
    tdStatus.innerText = elem.estado;

    let tdActions = tr.insertCell(2);
    tdActions.className = "text-center";

    // buttons actions
    if (tdStatus.innerText != "Complete") {

      var buttonDone = document.createElement("i");
      buttonDone.className = "fas fa-check-square fa-2x";
      buttonDone.type = "button";
      buttonDone.addEventListener("click", (e) => {
        statusChange(elem.id);
        e.target.style.display = "none";
        buttonUpdate.style.display = "none";
      });

      var buttonUpdate = document.createElement("i");
      buttonUpdate.className = "fas fa-pen-square fa-2x";
      buttonUpdate.type = "button";
      buttonUpdate.addEventListener("click", () => {

        let formUpdate = document.createElement("div");
        formUpdate.className = "input-group";

        let groupButton = document.createElement("div");
        groupButton.className = "input-group-append";

        let inputUpdate = document.createElement("input");
        inputUpdate.className = "form-control";

        let buttonSave = document.createElement("button");
        buttonSave.textContent = "Save";
        buttonSave.className = "btn btn-warning btn-sm mr-1";
        buttonSave.addEventListener("click", () => {
          updateTask(elem.id, inputUpdate.value);
        });

        let buttonCancel = document.createElement("button");
        buttonCancel.textContent = "Cancel";
        buttonCancel.className = "btn btn-secondary btn-sm mr-2"
        buttonCancel.addEventListener("click", () => {
          loadPage();
        });

        tdTasks.innerText = "";
        inputUpdate.value = elem.descripcion

        formUpdate.appendChild(inputUpdate);
        formUpdate.appendChild(groupButton);
        groupButton.appendChild(buttonSave);
        groupButton.appendChild(buttonCancel);

        tdTasks.appendChild(formUpdate);

      });


      tdActions.appendChild(buttonDone);
      tdActions.appendChild(buttonUpdate);
    } else {
      tdTasks.setAttribute("style", "text-decoration: line-through; color: red;");

    }

    var buttonDelete = document.createElement("i");
    buttonDelete.className = "fas fa-times-circle fa-2x";
    buttonDelete.type = "button";
    buttonDelete.setAttribute("onClick", `deleteTask(${elem.id})`);
    tdActions.appendChild(buttonDelete);

  });

  taskTable.replaceChild(tbodyNew, tbody);

};

let loadPage = () => {

  fetch("http://localhost:8000/tasks", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
      method: "get",
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      tableTask(data)
    }).catch(error =>  {
      window.location.href = "/login";
    })
};
loadPage();

/**************************** ADD TASK ****************************/

function addTask() {
  let post_body = {
    descripcion: inputTask.value,
  };

  fetch("http://localhost:8000/tasks", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
      method: "POST",
      body: JSON.stringify(post_body),
    })
    .then((response) => {
      if (response.status == 200) {
        return;
      }
      loadPage();
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}

/**************************** UPDATE STATUS TASK ****************************/

function statusChange(id) {
  let post_body = {
    estado: "Complete",
  };

  fetch(`http://localhost:8000/tasks/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
      method: "PUT",
      body: JSON.stringify(post_body),
    })
    .then((response) => {
      console.log(response);
      loadPage();
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    });
}

/**************************** UPDATE TASK ****************************/

function updateTask(id, text) {
  let post_body = {
    descripcion: text,
  };

  fetch(`http://localhost:8000/tasks/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
      method: "PUT",
      body: JSON.stringify(post_body),
    })
    .then((response) => {
      console.log(response);
      loadPage();
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    });

}

/**************************** DELETE TASK ****************************/

function deleteTask(id) {
  fetch(`http://localhost:8000/tasks/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
      method: "DELETE",
    })
    .then((response) => {
      console.log(response.json());
      confirm("Estas seguro que desea borrar la tarea?");
      loadPage();
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    });
}

/**************************** GET TOKEN ****************************/

function getToken() {
  return localStorage.getItem("token");
}