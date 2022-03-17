window.onload = function() {
    leerJS();

    document.getElementById("nom_loc").focus();
    //logica de modal

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function leerJS() {
    var tabla = document.getElementById("tabla");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('filtro', document.getElementById('filtro').value);

    var ajax = objetoAjax();
    ajax.open("POST", "leer", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = '';
            /* Leerá la respuesta que es devuelta por el controlador: */
            recarga += '<div>';
            recarga += '<tr>';
            recarga += '<th scope="col">Nombre</th>';
            recarga += '<th scope="col">Direccion</th>';
            recarga += '<th scope="col">Foto</th>';
            recarga += '<th scope="col">ID icono</th>';
            recarga += '<th scope="col">Descripcion</th>';
            recarga += '<th scope="col">Tipo</th>';
            recarga += '</tr>';
            for (let i = 0; i < respuesta.length; i++) {
                recarga += '<tr>';
                recarga += '<td>' + respuesta[i].nom_loc + '</td>';
                recarga += '<td>' + respuesta[i].direccion_loc + '</td>';
                recarga += '<td>' + respuesta[i].foto_loc + '</td>';
                recarga += '<td>' + respuesta[i].id_icono + '</td>';
                recarga += '<td>' + respuesta[i].descripcion_loc + '</td>';
                recarga += '<td>' + respuesta[i].tipo_loc + '</td>';
                recarga += '<td><button class="btn btn-secondary" onclick="openmodal(' + respuesta[i].id + ',`' + respuesta[i].nom_loc + '`,`' + respuesta[i].direccion_loc + '`,`' + respuesta[i].id_icono + '`,`' + respuesta[i].descripcion_loc + '`,`' + respuesta[i].tipo_loc + '`); return false;">Actualizar</button></td>';
                recarga += '<td><button class="btn btn-primary" onclick="eliminarJS(' + respuesta[i].id + '); return false;">Eliminar</button></td>';
                recarga += '</tr>';
            }
            recarga += '</div>';
            tabla.innerHTML = recarga;
        }
    }
    ajax.send(formData);
}

function crearJS() {
    var message = document.getElementById('message');
    var nom_loc = document.getElementById('nom_loc').value;
    var direccion_loc = document.getElementById('direccion_loc').value;
    var foto_loc = document.getElementById('foto_loc').files[0];
    var id_icono = document.getElementById('id_icono').value;
    var descripcion_loc = document.getElementById('descripcion_loc').value;
    var tipo_loc = document.getElementById('tipo_loc').value;
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nom_loc', nom_loc);
    formData.append('direccion_loc', direccion_loc);
    formData.append('foto_loc', foto_loc);
    formData.append('id_icono', id_icono);
    formData.append('descripcion_loc', descripcion_loc);
    formData.append('tipo_loc', tipo_loc);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "crear", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            if (respuesta.resultado == "OK") {
                message.innerHTML = '<p class="green">Nota creada correctamente</p>';
                document.getElementById('nom_loc').value = "";
                document.getElementById('direccion_loc').value = "";
                document.getElementById('foto_loc').value = "";
                document.getElementById('id_icono').value = "";
                document.getElementById('descripcion_loc').value = "";
                document.getElementById('tipo_loc').value = "";
            } else {
                message.innerHTML = 'Ha habido un error: ' + respuesta.resultado;
            }
            leerJS();
        }
    }
    ajax.send(formData)
}

function openmodal(id, nom_loc, direccion_loc, id_icono, descripcion_loc, tipo_loc) {
    var modal = document.getElementById("myModal");
    var modalcontent = document.getElementById("modal-content");
    modalcontent.innerHTML = "<form method='post' onsubmit='actualizarJS(" + id + "); return false;' enctype='multipart/form-data'><p>Nota #" + id + "</p><br><p>Nombre:</p><input type='text' name='nom_loc' id='nom' value='" + nom_loc + "'><br><p>Direccion:</p><input type='text' name='direccion_loc' id='direccion' value='" + direccion_loc + "'><br><p>Foto:</p><input type='file' name='foto_loc' id='foto'<br><p>Icono: 1-Metro, 2-Hotel, 3-Mercado, 4-Monumento, 5-Museo, 6-Restaurante</p><input type='number' name='id_icono' id='icono' value='" + id_icono + "'><br><p>Descripcion:</p><input type='text' name='descripcion_loc' id='descripcion' value='" + descripcion_loc + "'><br><p>Tipo:</p><input type='text' name='tipo_loc' id='tipo' value='" + tipo_loc + "'><br><button class= 'btn btn-secondary' type='submit' value='Edit'>Editar</button></form>";
    modal.style.display = "block";
}

function actualizarJS(id) {
    var message = document.getElementById('message');
    var nom_loc = document.getElementById('nom').value;
    var direccion_loc = document.getElementById('direccion').value;
    var foto_loc = document.getElementById('foto').files[0];
    var id_icono = document.getElementById('icono').value;
    var descripcion_loc = document.getElementById('descripcion').value;
    var tipo_loc = document.getElementById('tipo').value;
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'PUT');
    formData.append('nom_loc', nom_loc);
    formData.append('direccion_loc', direccion_loc);
    formData.append('foto_loc', foto_loc);
    formData.append('id_icono', id_icono);
    formData.append('descripcion_loc', descripcion_loc);
    formData.append('tipo_loc', tipo_loc);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "actualizar/" + id, true);
    ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var respuesta = JSON.parse(this.responseText);
                if (respuesta.resultado == "OK") {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    message.innerHTML = '<p class="green">Nota actualizada correctamente</p>';
                } else {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    message.innerHTML = 'Ha habido un error: ' + respuesta.resultado;
                }
                leerJS();
            }
        }
        /*
        send(string)->Sends the request to the server (used for POST)
        */
    ajax.send(formData)
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function eliminarJS(id) {
    var token = document.getElementById('token').getAttribute("content");
    var formData = new FormData();
    formData.append('_token', token);
    formData.append('_method', 'delete');

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "eliminar/" + id, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            leerJS();
        }
    }
    ajax.send(formData)
}