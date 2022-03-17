document.getElementById('formcrear').onsubmit = validar;

function validar() {
    let nom_loc = document.getElementById("nom_loc").value;
    let direccion_loc = document.getElementById("direccion_loc").value;
    let foto_loc = document.getElementById("foto_loc").value;
    let id_icono = document.getElementById("id_icono").value;
    let descripcion_loc = document.getElementById("descripcion_loc").value;
    let tipo_loc = document.getElementById("tipo_loc").value;
    if (nom_loc == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir el nombre",
            icon: "error",
        });
        return false;
    } else if (direccion_loc == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir la direccion",
            icon: "error",
        });
        return false;
    } else if (foto_loc == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir una foto",
            icon: "error",
        });
        return false;
    } else if (id_icono == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir el numero de icono",
            icon: "error",
        });
        return false;
    } else if (descripcion_loc == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir la descripcion",
            icon: "error",
        });
        return false;
    } else if (tipo_loc == "") {
        swal({
            title: "Error",
            text: "Tienes que introducir el tipo",
            icon: "error",
        });
        return false;
    } else {
        return true;
    }
}