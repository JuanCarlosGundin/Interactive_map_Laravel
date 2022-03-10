window.onload = function() {
    lat = 0;
    lon = 0;
    routingControl = {};
    mapMarkers = [];
    markerdrag = {};

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
map.setView([41.3533441, 2.1122431], 12);

function mostrarmapaJS(id) {
    var idt = document.getElementById('usuarioID').value
    console.log(idt)
    //Creamos el formdata que se enviara al controller
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    //id del usuario el cual tenemos que filtrar segun sus etiquetas
    formData.append('id', id);
    filtro = document.getElementById('etiqueta').value
        //aqui comprobamos que la etiqueta está vacia o llena con información
    if (filtro == "") { formData.append('etiqueta', 666) } else { formData.append('etiqueta', document.getElementById('etiqueta').value) }
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
                //iteramos los marquers con la información recibida
                popups(respuesta[i].direccion_loc, respuesta[i].nom_loc, respuesta[i].foto_loc, respuesta[i].descripcion_loc, respuesta[i].icono_loc, respuesta[i].tipo_loc,id)

            }
        }
    }
    ajax.send(formData)
}

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
                popups(respuesta[i].direccion_loc, respuesta[i].nom_loc, respuesta[i].foto_loc, respuesta[i].descripcion_loc, respuesta[i].icono_loc, respuesta[i].tipo_loc,id)

            }
        }
    }
    ajax.send(formData)
}

function popups(direccion, nombre, foto_loc, descripcion_loc, icono_loc, tipo_loc,id_usu) {

    L.esri.Geocoding.geocode({
        apikey: 'AAPKbfa578cdbb364f19acd6f66898f69789JE8ubfzUeNcE_1-_m2wPRTzApVhYnHEmSOkCXQ-8Yn3wxhHQkRRyP69j7CkXt-ev'
    }).text(direccion).run(function(err, results, response) {
        if (err) {
            console.log(err);
            return;
        }
        var marker = L.marker(results.results[0].latlng).addTo(map)
            .bindPopup(nombre).openPopup();
        mapMarkers.push(marker)
        marker._icon.classList.add("huechange");
        marker.on('click', function(event) {
            mostrarinfo(direccion, nombre, foto_loc, descripcion_loc,id_usu);
            console.log(this);
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
            //map.setView([lat, lon], 15);
        });
    });
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
    var tuubicacion = L.marker(L.latLng(lat, lon)).addTo(map)
        .bindPopup("Aqui estas").openPopup();
}

map.on('click', onMapClick);

function onMapClick(e) {
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
    /* map.setView([lat, lon], 15); */
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
        /* map.setView([lat, lon], 15); */
    });
    map.addLayer(markerdrag);
};
//muestra la informacion debajo del mapa
function mostrarinfo(direccion, nombre, foto_loc, descripcion_loc) {
    var idt = document.getElementById('usuarioID').value
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_usu',idt);
    formData.append('nombre',nombre);
    formData.append('direccion',direccion);
    var ajax = objetoAjax();
    ajax.open("POST", "comprobarfav", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var info = document.getElementById("info");
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta.length)
            var num=respuesta.length
            if(num==1){
                var recarga = '';
                recarga += '<p>' + nombre + '</p>';
                recarga += '<p>' + foto_loc + '</p>';
                recarga += '<p>' + descripcion_loc + '</p>';
                recarga += '<p>' + direccion + '</p>';
                recarga += '<button onclick="añadirfav(idt,nombre,direccion,foto_loc, descripcion_loc); return false;">Quitar favorito</button>';
            }else{
                var recarga = '';
                recarga += '<p>' + nombre + '</p>';
                recarga += '<p>' + foto_loc + '</p>';
                recarga += '<p>' + descripcion_loc + '</p>';
                recarga += '<p>' + direccion + '</p>';
                recarga += '<button onclick="borrarfav(idt,nombre,direccion,foto_loc, descripcion_loc); return false;">Añadir favorito</button>';
            }
        }
        info.innerHTML = recarga;
    }
    ajax.send(formData)
}

function añadirfav(id,nombre,direccion,foto_loc, descripcion_loc){
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_usu',id);
    formData.append('nombre',nombre);
    var ajax = objetoAjax();
    ajax.open("POST", "añadirfav", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            mostrarinfo(direccion, nombre, foto_loc, descripcion_loc)
        }
    }
    ajax.send(formData)
}

function borrarfav(id,nombre){
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_usu',id);
    formData.append('nombre',nombre);
    var ajax = objetoAjax();
    ajax.open("POST", "", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);

        }
        info.innerHTML = recarga;
    }
    ajax.send(formData)
}