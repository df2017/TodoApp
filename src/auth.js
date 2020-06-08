let formRegister = document.getElementById("register");

document.getElementById("login").addEventListener("click", () => {

    const user = document.getElementById('inputUser');
    const passw = document.getElementById('inputPassword');
    const data = {
        user: user.value,
        password: passw.value
    };

    fetch('https://todoappd.herokuapp.com/auth', {
        headers: {
            "Content-Type": "application/json"
          },
        method: "POST",
        body: JSON.stringify(data)
    })    
    .then((response) => response.json())
    .then(response => {
        localStorage.setItem("token", response.token);
        window.location.href = "/home";

    }).catch(error => {
        console.log("No consiguio el token.", error)
    })
})

document.querySelector("div.card-body > form > a").addEventListener("click",(e) => {
    //e.target.href = "/register";
    formRegister.style.display = "block";
})