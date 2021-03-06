<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <link rel="stylesheet" href="../public/css/login.css">
    <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Arimo' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Hind:300' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../public/img/logo2.png" type="image/x-icon">
    <title>Formulario login</title>
</head>
<body>
    <div id="login-button" onclick="formlogin()">
        <img src="../public/img/logo.png">
    </div>
    <div class="fade-in" id="container">    
    <form action="{{url('loginPost')}}" method="POST" id="formlogin">
        <h1>Log In</h1>  
        @csrf
        {{method_field('POST')}}
        <input type="email" name="mail_usu" id="mail_usu" placeholder="E-mail">
        <input type="password" name="contra_usu" id="contra_usu" placeholder="Password">
        <input type="submit" value="Log in">
    </form>
    </div>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="../public/js/login.js"></script>
</body>
</html>