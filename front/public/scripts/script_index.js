/* const { SimpleConsoleLogger } = require("typeorm"); */

function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("adminLogin").addEventListener("submit", function(event) {
    event.preventDefault()

    const login = document.getElementById("login").value
    const senha = document.getElementById("senha").value 

    console.log(login, senha);

    if (login === "admin" && senha === "admin") {
        window.location.href = "/admin"
    } else {
        alert("usuario ou senha incorretos!")
    }
})