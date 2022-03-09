@if(!Session::get('mail_admin'))
    <?php
        //Si la session no esta definida te redirige al login.
        return redirect()->to('/')->send();
    ?>
@endif
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="../public/css/modal.css">
    <script src="js/crud.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="../public/css/index.css">
    <link rel="shortcut icon" href="../public/img/logo2.png" type="image/x-icon">
    <title>Animales</title>
</head>
<body class="m-5">
    <div class="admin-div1">
        <form action='{{url('logout')}}' method='get'>
            <button class='btn' type='submit' ><i class='fas fa-user'></i>  Cerrar sesión</button>
        </form>
    </div>
    <div>
        <form method="POST" onsubmit="crearJS(); return false;">
            <div class="form-group">
            <label class="col-sm-2 col-form-label">Nombre:</label>
            <input type="text" class="form-control" id="nom_loc" name="nom_loc" placeholder="Introduce un nombre" value="{{old('nom_loc')}} " required>
            </div>
            <div class="form-group">
            <label class="col-sm-2 col-form-label">Direccion:</label>
            <input type="text" class="form-control" id="direccion_loc" name="direccion_loc" placeholder="Introduce un peso" value="{{old('direccion_loc')}}" required>
            </div>
            <div class="form-group">
            <label class="col-sm-2 col-form-label">Descripcion:</label>
            <input type="text" class="form-control" id="descripcion_loc" name="descripcion_loc" placeholder="Introduce un numero de serie" value="{{old('descripcion_loc')}}" required><br>
            </div>
            <div class="form-group">
            <label class="col-sm-2 col-form-label">Tipo:</label>
            <input type="text" class="form-control" id="tipo_loc" name="tipo_loc" placeholder="Introduce un numero de serie" value="{{old('tipo_loc')}}" required><br>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
    </div>
    <div id="message"></div>
    <label>Nombre:</label>
    <input type="text" onkeyup="leerJS()" id="filtro"><br><br>
    <table class="table" id="tabla">
        {{-- contenido ajax --}}
    </table>
    <div id="myModal" class="modal">
        <div>
            <span class="close">&times;</span>
        </div>
        <div id="modal-content" class="modal-content">
        </div>
    </div>
</body>
</html>