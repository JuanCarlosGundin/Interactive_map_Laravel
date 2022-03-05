window.onload = function() {
    lat = 0;
    lon = 0;
    routingControl = {};
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
map.setView([41.3533441, 2.1122431], 12);

function mostrarmapaJS() {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "mostrarmapas", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            for (let i = 0; i < respuesta.length; i++) {
                popups(respuesta[i].direccion_loc, respuesta[i].nom_loc)

            }
        }
    }
    ajax.send(formData)
}

function popups(direccion, nombre) {

    L.esri.Geocoding.geocode({
        apikey: 'AAPKbfa578cdbb364f19acd6f66898f69789JE8ubfzUeNcE_1-_m2wPRTzApVhYnHEmSOkCXQ-8Yn3wxhHQkRRyP69j7CkXt-ev'
    }).text(direccion).run(function(err, results, response) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(direccion);
        console.log(results);
        var marker = L.marker(results.results[0].latlng).addTo(map)
            .bindPopup(nombre).openPopup();
        marker._icon.classList.add("huechange");
        marker.on('click', function(event) {
            if (Object.keys(routingControl).length != 0) {
                map.removeControl(routingControl);
            }
            var marker = event.target;
            var position = marker.getLatLng();
            routingControl = L.Routing.control({
                waypoints: [
                        L.latLng(lat, lon),
                        L.latLng(position.lat, position.lng)
                    ] //,show: false
            }).addTo(map);
            map.setView([lat, lon], 15);
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
            ] //,show: false
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
                ] //,show: false
        }).addTo(map);
        /* map.setView([lat, lon], 15); */
    });
    map.addLayer(markerdrag);
};