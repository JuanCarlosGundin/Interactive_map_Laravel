window.onload = function() {
    lat = 0;
    lon = 0;
    //ruta de mapa
    routingControl = {};
    //array de markers
    mapMarkers = [];
    //marker de ubicacion
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

var map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.setView([41.3533441, 2.1122431], 13);

function mostrarmapaJS(id) {

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
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
            if (mapMarkers.length != 0) {
                //siempre que se recargue el mapa, que se eliminen los markers anteriores
                for (let z = 0; z < mapMarkers.length; z++) {
                    map.removeLayer(mapMarkers[z]);
                }
                mapMarkers = [];
            }
            for (let i = 0; i < respuesta.length; i++) {
                popups(respuesta[i].direccion_loc, respuesta[i].nom_loc, respuesta[i].foto_loc, respuesta[i].descripcion_loc, respuesta[i].nombre_icono, respuesta[i].tipo_loc)
            }
        }
    }
    ajax.send(formData)
}

function popups(direccion, nombre, foto_loc, descripcion_loc, nombre_icono, tipo_loc) {
    L.esri.Geocoding.geocode({
        apikey: 'AAPKbfa578cdbb364f19acd6f66898f69789JE8ubfzUeNcE_1-_m2wPRTzApVhYnHEmSOkCXQ-8Yn3wxhHQkRRyP69j7CkXt-ev'
    }).text(direccion).run(function(err, results, response) {
        if (err) {
            console.log(err);
            return;
        }
        var icono = L.icon({
            iconUrl: 'http://localhost/laravel/Proyecto4_mapas/storage/app/public/' + nombre_icono,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });
        var marker = L.marker(results.results[0].latlng, { icon: icono });
        if (foto_loc != null) {
            marker.bindPopup(`<p>${nombre}</p><img class="imagen" src='http://localhost/laravel/Proyecto4_mapas/storage/app/public/${foto_loc}'><p>${descripcion_loc}</p><p>${direccion}</p><button></button>`).openPopup();
        } else {
            marker.bindPopup(`<p>${nombre}</p>`).openPopup();
        }
        marker.addTo(map)
            //meter el marker al grupo de markers
        mapMarkers.push(marker)
            //cambia el color del marker
        marker._icon.classList.add("huechange");
        marker.on('click', function(event) {
            mostrardiv();
            mostrarinfo(direccion, nombre, foto_loc, descripcion_loc);
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

function mostrardiv() {
    window.scrollTo(0, 500);
}

function mostrarinfo(direccion, nombre, foto_loc, descripcion_loc) {
    var info = document.getElementById("info");
    var recarga = '';
    recarga += '<p class="parrafo">Nombre: ' + nombre + '</p>';
    recarga += '<p>' + foto_loc + '</p>';
    recarga += '<p>Descricpion: ' + descripcion_loc + '</p>';
    recarga += '<p>Direccion: ' + direccion + '</p>';
    info.innerHTML = recarga;

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
    var tuubicacion = L.marker(L.latLng(lat, lon)).addTo(map)
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

function centrarJS() {
    map.setView([lat, lon], 13);
}

//Formulario gincana
function formgincana() {
    var token = document.getElementById('token').getAttribute("content");

    var formData = new FormData();
    formData.append('_token', token);
    formData.append('_method', "POST");

    var ajax = objetoAjax();

    ajax.open("POST", "gincana", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var info = document.getElementById("info");
            var recarga = '';
            recarga += '<div class="formgincana">';
            recarga += '<form method="POST">';
            recarga += '<h1>Gincana</h1> ';
            recarga += '<input class="input-gincana" type="text" name="nom_sala" placeholder="Nombre Sala">';
            recarga += '<input class="input-gincana" type="text" name="contra_sala" placeholder="Codigo Sala">';
            recarga += '<div class="">'
            recarga += '<input class="input-gincana" type="submit" value="Crear">';
            recarga += '<input class="input-gincana" type="submit" value="Unirse">';
            recarga += '</div>'
            recarga += '</form>';
            recarga += '</div>';
            info.innerHTML = recarga;
        }
    }
    ajax.send(formData)
}