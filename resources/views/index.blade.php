@if(!Session::get('mail_usu'))
    <?php
        //Si la session no esta definida te redirige al login.
        return redirect()->to('/')->send();
    ?>
@endif
<?php
    $id= Session::get('id_usu');
?>
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
    <link rel="stylesheet" href="../public/css/index.css">
    <link rel="shortcut icon" href="../public/img/logo2.png" type="image/x-icon">
</head>

<body>
    <div class="container">
        <div class="index-div1">
            <input type="hidden" id="usuarioID" value='<?php echo $id; ?>'>
            <input type="text" id="etiqueta" onkeyup="mostrarmapaJS(<?php echo $id; ?>); return false;">
            <br>    
            <input type="checkbox" id="Monumento" value="Monumento" onclick="mostrarmapaJS(<?php echo $id; ?>)" checked>Monumentos
            <input type="checkbox" id="Museos" value="Museo" onclick="mostrarmapaJS(<?php echo $id; ?>)" checked>Museos
            <input type="checkbox" id="Restaurantes" value="Restaurante" onclick="mostrarmapaJS(<?php echo $id; ?>)" checked>Restaurantes
            <br>
            <input type="checkbox" id="Metro" value="Metro" onclick="mostrarmapaJS(<?php echo $id; ?>)" checked>Metros
            <input type="checkbox" id="Hotel" value="Hotel" onclick="mostrarmapaJS(<?php echo $id; ?>)" checked>Hoteles
            <input type="checkbox" id="Mercado" value="Mercado" onclick="mostrarmapaJS(<?php echo $id; ?>)" checked>Mercados
            <br>
            <button onclick="favoritomapaJS(<?php echo $id; ?>); return false;">FAVORITOS</button>
        </div>
        <div class="index-div2">
            <form action='{{url('logout')}}' method='get'>
                <button class="bt-logout"><img src="../public/img/logout.png" class="logoutic"></button>
            </form>
        </div>
    </div>
        <!-- onclick="getLocation();" -->
        <div class="map" id="map">

        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/leaflet.esri.geocoder/2.1.0/esri-leaflet-geocoder.css">
        <script src="https://cdn.jsdelivr.net/leaflet.esri.geocoder/2.1.0/esri-leaflet-geocoder.js"></script>
        <script src="js/mapa.js"></script>
        <div id="info">
            
        </div>
</body>

</html>