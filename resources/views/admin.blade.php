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
    <title>Administracion</title>
</head>
<body class="m-5">
    <form method="POST" onsubmit="crearJS(); return false;" enctype="multipart/form-data">
        <div class="form-group">
        <label class="col-sm-2 col-form-label">Nombre:</label>
        <input type="text" class="form-control" id="nom_loc" name="nom_loc" placeholder="Introduce un nombre" value="{{old('nom_loc')}} ">
        </div>
        <div class="form-group">
        <label class="col-sm-2 col-form-label">Direccion:</label>
        <input type="text" class="form-control" id="direccion_loc" name="direccion_loc" placeholder="Introduce una direccion" value="{{old('direccion_loc')}}">
        </div>
        <div class="form-group">
        <label class="col-sm-2 col-form-label">Foto:</label>
        <input type="file" class="form-control" id="foto_loc" name="foto_loc">
        </div>
        <div class="form-group">
        <label class="col-form-label">Icono: 1-Metro, 2-Hotel, 3-Mercado, 4-Monumento, 5-Museo, 6-Restaurante</label>
        <input type="number" class="form-control" id="id_icono" name="id_icono" required>
        </div>
        <div class="form-group">
        <label class="col-sm-2 col-form-label">Descripcion:</label>
        <input type="text" class="form-control" id="descripcion_loc" name="descripcion_loc" placeholder="Introduce una descripcion" value="{{old('descripcion_loc')}}">
        </div>
        <div class="form-group">
        <label class="col-sm-2 col-form-label">Tipo:</label>
        <input type="text" class="form-control" id="tipo_loc" name="tipo_loc" placeholder="Metro-Restaurante-Mercado-Museo-Monumento-Hotel" value="{{old('tipo_loc')}}"><br>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
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