window.onload = function() {
    lat = 0;
    lon = 0;
    //ruta de mapa
    routingControl = {};
    //array de markers
    mapMarkers = [];
    //marker de ubicacion cuando ti clicas al destino
    markerdrag = {};
    //marker de tu ubicacion
    markerubicacion = {};

    getLocation()
    mostrarmapaJS()
    area()
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
//seteamos el mapa, en la zona que nos interesa, en este caso el Raval
var map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.setView([41.3533441, 2.1122431], 13);

function mostrarmapaJS(id) {
    var idt = document.getElementById('usuarioID').value
        //Creamos el formdata que se enviara al controller
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    //id del usuario el cual tenemos que filtrar segun sus etiquetas
    formData.append('id', id);
    filtro = document.getElementById('etiqueta').value
        //aqui comprobamos que la etiqueta está vacia o llena con información
    if (filtro == "") {
        formData.append('etiqueta', 666)
    } else {
        formData.append('etiqueta', document.getElementById('etiqueta').value)
    }
    //ZONA DE FILTRADO
    //filtramos por monumento
    var Monumento = document.getElementById("Monumento");
    if (Monumento.checked) {
        formData.append('Monumento', document.getElementById('Monumento').value)
    } else {
        formData.append('Monumento', 'nada')
    }
    //filtramos por museo
    var Museos = document.getElementById("Museos");
    if (Museos.checked) {
        formData.append('Museo', document.getElementById('Museos').value)
    } else {
        formData.append('Museo', 'nada')
    }
    //filtramos por Restaurantes
    var Restaurantes = document.getElementById("Restaurantes");
    if (Restaurantes.checked) {
        formData.append('Restaurante', document.getElementById('Restaurantes').value)
    } else {
        formData.append('Restaurante', 'nada')
    }
    //filtramos por metro
    var Metro = document.getElementById("Metro");
    if (Metro.checked) {
        formData.append('Metro', document.getElementById('Metro').value)
    } else {
        formData.append('Metro', 'nada')
    }
    //filtramos por Mercado
    var Mercado = document.getElementById("Mercado");
    if (Mercado.checked) {
        formData.append('Mercado', document.getElementById('Mercado').value)
    } else {
        formData.append('Hotel', 'nada')
    }
    //filtramos por Hotel
    var Hotel = document.getElementById("Hotel");
    if (Hotel.checked) {
        formData.append('Hotel', document.getElementById('Hotel').value)
    } else {
        formData.append('Hotel', 'nada')
    }
    //TERMINA FILTRADO
    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "mostrarmapas", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            //si los marquers existen este if lo remueve no problemm
            if (mapMarkers.length != 0) {
                for (let z = 0; z < mapMarkers.length; z++) {
                    //función que remueve el mapa js 
                    map.removeLayer(mapMarkers[z]);
                }
                mapMarkers = [];
            }
            for (let i = 0; i < respuesta.length; i++) {
                popups(respuesta[i].id_loc, respuesta[i].direccion_loc, respuesta[i].nom_loc, respuesta[i].foto_loc, respuesta[i].descripcion_loc, respuesta[i].nombre_icono, respuesta[i].tipo_loc, id)
            }
        }
    }
    ajax.send(formData)
}

function popups(id_loc, direccion, nombre, foto_loc, descripcion_loc, nombre_icono, tipo_loc, id_usu) {

    L.esri.Geocoding.geocode({
        apikey: 'AAPKbfa578cdbb364f19acd6f66898f69789JE8ubfzUeNcE_1-_m2wPRTzApVhYnHEmSOkCXQ-8Yn3wxhHQkRRyP69j7CkXt-ev'
    }).text(direccion).run(function(err, results, response) {
        if (err) {
            console.log(err);
            return;
        }
        var icono = L.icon({
            iconUrl: 'storage/' + nombre_icono,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });
        var marker = L.marker(results.results[0].latlng, { icon: icono });
        if (foto_loc != null) {
            marker.bindPopup(`<center><b><p>${nombre}</p><hr></b><img class="imagen" src='storage/${foto_loc}'><p>${descripcion_loc}</p><p>${direccion}</p>`).openPopup();
        } else {
            marker.bindPopup(`<center><b><p>${nombre}</p><hr></b><p>${descripcion_loc}</p><p>${direccion}</p>`).openPopup();
        }
        marker.addTo(map)
            //meter el marker al grupo de markers
        mapMarkers.push(marker)
            //cambia el color del marker
        marker._icon.classList.add("huechange");
        marker.on('click', function(event) {
            mostrarinfo(id_loc, direccion, nombre, foto_loc, descripcion_loc, id_usu);
            console.log(this);
            if (Object.keys(routingControl).length != 0) {
                map.removeControl(routingControl);
            }
            var marker = event.target;
            var position = marker.getLatLng();
            //crea la ruta desde la ubicacion de la persona al destino
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(lat, lon),
                    L.latLng(position.lat, position.lng)
                ],
                language: 'es',
                show: false
            }).addTo(map);
        });
    });
}

//muestra la informacion debajo del mapa
function mostrarinfo(id_loc, direccion, nombre, foto_loc, descripcion_loc) {
    console.log(id_loc);
    var info = document.getElementById("info");
    var idt = document.getElementById('usuarioID').value
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_usu', idt);
    formData.append('nombre', nombre);
    formData.append('direccion', direccion);
    var ajax = objetoAjax();
    ajax.open("POST", "comprobarfav", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var num = respuesta.length
            if (num == 1) {
                var recarga = '';
                /* recarga += '<p>' + nombre + '</p>';
                if (foto_loc != null) {
                    recarga += '<p><img class="imagen" src="storage/' + foto_loc + '"></p>';
                } else {
                    recarga += '<p>Imagen no disponible</p>';
                }
                recarga += '<p>' + descripcion_loc + '</p>';
                recarga += '<p>' + direccion + '</p>'; */
                recarga += '<form onsubmit="anadiretiqueta(\'' + id_loc + '\'); return false;">';
                recarga += '<input type="text" placeholder="Introduce una etiqueta" id="eti">';
                recarga += '<button>Enviar</button>';
                recarga += '</form>';
                recarga += '<button onclick="borrarfav(\'' + id_loc + '\',\'' + idt + '\',\'' + nombre + '\',\'' + direccion + '\',\'' + foto_loc + '\',\'' + descripcion_loc + '\'); return false;">Quitar favorito</button>';
            } else {
                var recarga = '';
                /* recarga += '<p>' + nombre + '</p>';
                if (foto_loc != null) {
                    recarga += '<p><img class="imagen" src="storage/' + foto_loc + '"></p>';
                } else {
                    recarga += '<p>Imagen no disponible</p>';
                }
                recarga += '<p>' + descripcion_loc + '</p>';
                recarga += '<p>' + direccion + '</p>'; */
                recarga += '<form onsubmit="anadiretiqueta(\'' + id_loc + '\'); return false;">';
                recarga += '<input type="text" placeholder="Introduce una etiqueta" id="eti">';
                recarga += '<button>Enviar</button>';
                recarga += '</form>';
                recarga += '<button onclick="añadirfav(\'' + id_loc + '\',\'' + idt + '\',\'' + nombre + '\',\'' + direccion + '\',\'' + foto_loc + '\',\'' + descripcion_loc + '\'); return false;">Añadir favorito</button>';
            }
        }
        info.innerHTML = recarga;
    }
    ajax.send(formData)

}

function anadiretiqueta(id_loc) {

    var eti = document.getElementById("eti").value;
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "POST");
    formData.append('id_localizacion', id_loc);
    formData.append('nom_etiqueta', eti);


    var ajax = objetoAjax();
    ajax.open("POST", "anadiretiqueta", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta.resultado)
            document.getElementById("eti").value = "";
        }
    }
    ajax.send(formData)
}

function area() {
    var latlngs = [
        [41.375043, 2.167848],
        [41.374710, 2.178315],
        [41.380773, 2.183080],
        [41.388457, 2.172747],
        [41.385706, 2.169787],
        [41.386025, 2.164075],
        [41.378733, 2.163077]
    ];
    //crea un perimetro azul donde esta la ubicacion de la actividad
    var polygon = L.polygon(latlngs, { fillOpacity: '0' }).addTo(map);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    if (Object.keys(markerubicacion).length != 0) {
        map.removeLayer(markerubicacion);
    }
    markerubicacion = L.marker(L.latLng(lat, lon)).addTo(map)
}

map.on('click', onMapClick);

function onMapClick(e) {
    //quita el marker de la ubicacion
    if (Object.keys(markerdrag).length != 0) {
        map.removeLayer(markerdrag);
    }
    markerdrag = new L.marker(e.latlng, { draggable: 'true', autoPan: 'true' });
    if (Object.keys(routingControl).length != 0) {
        map.removeControl(routingControl);
    }
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(lat, lon),
            L.latLng(e.latlng.lat, e.latlng.lng)
        ],
        language: 'es',
        show: false
    }).addTo(map);
    markerdrag.on('dragend', function(event) {
        if (Object.keys(routingControl).length != 0) {
            map.removeControl(routingControl);
        }
        var marker = event.target;
        var position = marker.getLatLng();
        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(lat, lon),
                L.latLng(position.lat, position.lng)
            ],
            language: 'es',
            show: false
        }).addTo(map);
    });
    map.addLayer(markerdrag);
};

//Función que muestra los favoritos del usuario en cuestiónç
function favoritomapaJS(id) {
    console.log(id)
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id', id);
    //TERMINA FILTRADO
    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "mostrarfavorito", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            if (mapMarkers.length != 0) {
                for (let z = 0; z < mapMarkers.length; z++) {
                    map.removeLayer(mapMarkers[z]);
                }
                mapMarkers = [];
            }
            for (let i = 0; i < respuesta.length; i++) {
                popups(respuesta[i].id_loc, respuesta[i].direccion_loc, respuesta[i].nom_loc, respuesta[i].foto_loc, respuesta[i].descripcion_loc, respuesta[i].nombre_icono, respuesta[i].tipo_loc, id)

            }
        }
    }
    ajax.send(formData)
}

function añadirfav(id_loc, id, nombre, direccion, foto_loc, descripcion_loc) {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_usu', id);
    formData.append('nombre', nombre);
    var ajax = objetoAjax();
    ajax.open("POST", "anadirfav", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            mostrarinfo(id_loc, direccion, nombre, foto_loc, descripcion_loc);
        }
    }
    ajax.send(formData)
}

function borrarfav(id_loc, id, nombre, direccion, foto_loc, descripcion_loc) {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_usu', id);
    formData.append('nombre', nombre);
    var ajax = objetoAjax();
    ajax.open("POST", "borrarfav", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            mostrarinfo(id_loc, direccion, nombre, foto_loc, descripcion_loc);
        }
    }
    ajax.send(formData)
}

function centrarJS() {
    map.setView([lat, lon], 13);
}

//Formulario gincana
function formgincana() {
    var info = document.getElementById("info");
    var recarga = '';
    recarga += '<div class="formgincana">';
    recarga += '<form method="GET">';
    recarga += '<h1 class="titulo">Gincana</h1> ';
    recarga += '<div>';
    recarga += '<center>';
    recarga += '<input type="text" class="input-gincana" name="nom_sala" id="nom_sala" placeholder="Nombre Sala">';
    recarga += '<input type="text" class="input-gincana" name="contra_sala" id="contra_sala" placeholder="Codigo Sala">';
    recarga += '</div>';
    recarga += '<div>';
    recarga += '<input class="botton-gincana" type="submit" name="boton" value="Crear" onclick="gincanaGET(`crear`); return false;">';
    recarga += '<input class="botton-gincana" type="submit" name="boton" value="Unirse" onclick="gincanaGET(`unirse`); return false;">';
    recarga += '</div>';
    recarga += '<div id=mensaje></div>';
    recarga += '</center>';
    recarga += '</form>';
    recarga += '</div>';
    info.innerHTML = recarga;
}

function gincanaGET(valor) {
    var mensaje = document.getElementById('mensaje');
    var token = document.getElementById('token').getAttribute("content");
    var nom_sala = document.getElementById('nom_sala').value;
    var contra_sala = document.getElementById('contra_sala').value;

    var formData = new FormData();
    formData.append('_token', token);
    formData.append('_method', "POST");
    formData.append('nom_sala', nom_sala);
    formData.append('contra_sala', contra_sala);
    formData.append('valor', valor);

    var ajax = objetoAjax();

    ajax.open("POST", "gincanaPOST", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log(ajax.responseText);
            var respuesta = JSON.parse(this.responseText);
            if (respuesta.resultado == "NOKunirse") {
                console.log(respuesta.datos)
                mensaje.innerHTML = '<p>Esta sala no existe</p>';
            } else if (respuesta.resultado == "NOKcrear") {
                mensaje.innerHTML = '<p>El nombre de la sala ya existe</p>';
            } else if (respuesta.resultado == "NOKllena") {
                mensaje.innerHTML = '<p>Sala llena :(</p>';
            } else {
                mensaje.innerHTML = '<p>Funciona</p>';
                recargaSalaGin();
            }
        }
    }
    ajax.send(formData)

}

function recargaSalaGin() {
    var token = document.getElementById('token').getAttribute("content");
    var info = document.getElementById("info");
    var formData = new FormData();
    formData.append('_token', token);
    formData.append('_method', "POST");

    var ajax = objetoAjax();

    ajax.open("POST", "recargaSala", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var id_usu = respuesta.id_usu;
            //console.log(id_usu);
            var participante = JSON.parse(respuesta.elementos);
            //console.log(participante);
            //console.log(participante[0][0]);
            var recarga = '';
            if (participante[0][0].estado_sala == 0) {
                recarga += '<div class="formgincana">';
                recarga += '<h1>' + participante[0][0].nom_sala + '</h1> ';
                for (let i = 0; i < participante.length; i++) {
                    if (participante[i].length != 0) {
                        recarga += '<p class="input-gincana">' + participante[i][0].mail_usu + '</p>';
                    }
                }
                recarga += '<center>';
                if (id_usu == participante[0][0].id_creador) {
                    recarga += '<button class="botton-gincana" onclick="iniciarpartida()">Empezar</button>';
                } else {
                    recarga += '<button class="botton-gincana" onclick="recargaSalaGin()">Refrescar</button>';
                }
                recarga += '</center>';
                recarga += '</div>';
            } else {
                //partida en curso
                recarga += '<h1>' + respuesta.pistas[0].pista1 + '</h1> ';
                recarga += '<div class="formgincana">';
                for (let i = 0; i < participante.length; i++) {
                    if (participante[i].length != 0) {
                        recarga += '<div class="input-gincana">';
                        recarga += '<p>' + participante[i][0].mail_usu + '</p>';
                        recarga += '</div>';
                        recarga += '<div class="icono-gincana">';
                        recarga += '<p><i class="fas fa-check"></i></p>';
                        recarga += '</div>';
                        //cruz
                        /* recarga += '<p><i class="fas fa-times"></i></p>'; */
                    }
                }
                recarga += '<center>';
                recarga += '<button class="botton-sala" onclick="recargaSalaGin()">Refrescar</button>';
                recarga += '</center>';
                recarga += '</div>';
            }

        }
        info.innerHTML = recarga;
    }
    ajax.send(formData)
}

//partida en curso
function iniciarpartida() {
    var token = document.getElementById('token').getAttribute("content");
    var info = document.getElementById("info");
    var formData = new FormData();
    formData.append('_token', token);
    formData.append('_method', "POST");

    var ajax = objetoAjax();

    ajax.open("POST", "partida", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            recargaSalaGin()
        }
    }
    ajax.send(formData)
}