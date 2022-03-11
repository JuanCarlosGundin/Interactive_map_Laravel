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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
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
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <br>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="etiqueta" onkeyup="mostrarmapaJS(<?php echo $id; ?>); return false;">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <form action='{{url('logout')}}' method='get'>
                  <button class="btn btn-light"><img src="../public/img/logout.png" class="logoutic"></button>
              </form>
              </li>
              <li class="nav-item">
                <button class="btn btn-light" onclick="formgincana()"><img src="../public/img/gincana.png" class="logoutic"></button>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-light" onclick="centrarJS()">Centrar</button>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu p-1" aria-labelledby="navbarDropdown">
                  <li><div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Monumento" id="Monumento" onclick="mostrarmapaJS()">
                    <label class="form-check-label" for="Monumento">
                        Monumentos
                    </label>
                  </div></li>
                  <li><div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Museo" id="Museos" onclick="mostrarmapaJS()">
                    <label class="form-check-label" for="Museos">
                        Museos
                    </label>
                  </div></li>
                  <li><div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Restaurante" id="Restaurantes" onclick="mostrarmapaJS()">
                    <label class="form-check-label" for="Restaurantes">
                        Restaurantes
                    </label>
                  </div></li>
                  <li><div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Metro" id="Metro" onclick="mostrarmapaJS()">
                    <label class="form-check-label" for="Metro">
                        Metros
                    </label>
                  </div></li>
                  <li><div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Hotel" id="Hotel" onclick="mostrarmapaJS()">
                    <label class="form-check-label" for="Hotel">
                        Hoteles
                    </label>
                  </div></li>
                  <li><div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Mercado" id="Mercado" onclick="mostrarmapaJS()">
                    <label class="form-check-label" for="Mercado">
                        Mercados
                    </label>
                  </div></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <div id="map"></div>
    <br>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/leaflet.esri.geocoder/2.1.0/esri-leaflet-geocoder.css">
    <script src="https://cdn.jsdelivr.net/leaflet.esri.geocoder/2.1.0/esri-leaflet-geocoder.js"></script>
    <script src="js/mapa.js"></script>
    <div id="info"></div>
</body>

</html>