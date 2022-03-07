<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <title>Sitios</title>
    <!-- Load Leaflet from CDN -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>
    <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>


    <!-- Load Esri Leaflet from CDN -->
    <script src="https://unpkg.com/esri-leaflet@2.3.2/dist/esri-leaflet.js" integrity="sha512-6LVib9wGnqVKIClCduEwsCub7iauLXpwrd5njR2J507m3A2a4HXJDLMiSZzjcksag3UluIfuW1KzuWVI5n/cuQ==" crossorigin=""></script>
</head>

<body>
    <input type="text" id="etiqueta" onkeyup="mostrarmapaJS(2); return false;">
    <input type="checkbox" id="Monumento" value="Monumento" onclick="mostrarmapaJS(2)" checked>Monumentos
    <input type="checkbox" id="Museos" value="Museo" onclick="mostrarmapaJS(2)" checked>Museos
    <input type="checkbox" id="Restaurantes" value="Restaurante" onclick="mostrarmapaJS(2)" checked>Restaurantes
    <input type="checkbox" id="Metro" value="Metro" onclick="mostrarmapaJS(2)" checked>Metros
    <input type="checkbox" id="Hotel" value="Hotel" onclick="mostrarmapaJS(2)" checked>Hoteles
    <input type="checkbox" id="Mercado" value="Mercado" onclick="mostrarmapaJS(2)" checked>Mercados
    <button onclick="mostrarmapaJS(2); return false;">FAVORITOS</button>
    <br>
    <!-- onclick="getLocation();" -->
    <div id="map"></div>
    <br>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/leaflet.esri.geocoder/2.1.0/esri-leaflet-geocoder.css">
    <script src="https://cdn.jsdelivr.net/leaflet.esri.geocoder/2.1.0/esri-leaflet-geocoder.js"></script>
    <script src="js/mapa.js"></script>
</body>

</html>