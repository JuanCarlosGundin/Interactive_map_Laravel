function formlogin() {
    document.getElementById("login-button").classList.add("fade-out")
    document.getElementById("login-button").style.display = "none"
    document.getElementById("container").style.display = "block"
}

document.getElementById('formlogin').onsubmit = validar;

function validar() {
    let mail_usu = document.getElementById("mail_usu").value;
    let contra_usu = document.getElementById("contra_usu").value;
    if (mail_usu == "" && contra_usu == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir el correo y contraseña",
            icon: "error",
        });
        return false;
    } else if (mail_usu == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir el correo",
            icon: "error",
        });
        return false;
    } else if (contra_usu == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir la contraseña",
            icon: "error",
        });
        return false;
    } else {
        return true;
    }
}