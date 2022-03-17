# PR04-Mapas

Este proyecto se basa en la simulacion de un mapa de navegación, en el cual nos permite ver diferentes ubicaciones variadas y la ruta para llegar hasta ellas,
a su vez tendremos la posibilidad de jugar a nuestra gincana interactiva, la cual consistira en encontrar las ubicaciones con las pistas que se nos proporcionan.

# Pre-requisitos 📋

>1.- En caso de querer modificar el codigo fuente a nuestro gusto necesitaremos un editor de codigo, nosotros recomendamos Visual Studio Code (https://code.visualstudio.com/Download) este editor nos permitira realizar los cambios deseados.

>2.- Necesitaremos el programa XAMPP para poder interpretar los archivos PHP y no tengamos problemas (https://www.apachefriends.org/es/download.html)

# Instalación 🔧

## Teniendo GIT instalado:

>1.- Desde nuestro Visual Studio Code abrimos una nueva terminal (Ctrl+Shift+ñ).

>2.- Nos colocamos dentro de nuestro directorio donde tengamos XAMPP instalado, mas en concreto htdocs. En nuestro caso _"C:\xampp\htdocs"_.

>3.- Abrimos una terminal nueva y ahi ejecutamos el siguiente comando _"git clone "enlace del codigo"_", esto nos creara un directorio que contenga el proyecto, en este caso la carpeta se llamara PR4.

>4.- Deberemos ejecutar los siguientes comandos para que nos funcion nuestro proyecto: ```composer install``` 
>>Puede que, por problemas de compatibilidad, nos pida ejecutar el comando: ```composer update```

>5.-Crear el fichero ```.env``` en el directorio principal del proyecto con el contenido pertinente sera necesario para el funcionamiento del proyecto
>>Se puede utilizar el fichero .env.example para generar el nuevo .env

>6.-Finalmente, Laravel puede pedir que se ejecute el comando ```php artisan key:generate``` para generar una nueva variable de entorno APP_KEY

>7.-Tendremos que mover algunos ficheros para que se muestren de manera correcta:
>>Nos dirigremos a "C:\xampp\htdocs\Nombre Proyecto\public\img\foto" y copiaremos el contenido de dicha carpeta en "C:\xampp\htdocs\Nombre Proyecto\storage\app\public\foto"
>>Lo siguiente es hacer lo mismo pero para los iconos. Nos dirigremos a "C:\xampp\htdocs\Nombre Proyecto\public\img\icono" y copiaremos el contenido de dicha carpeta en "C:\xampp\htdocs\Nombre Proyecto\storage\app\public\icono".

>8.-El siguiente paso sera crear el link simbolico con el comando _"php artisan storage:link"_.

>9.-Crear la base de datos mediante migraciones o manualmente.

>10.- Una vez descargado el contenido de nuestro proyecto, lo que tendremos que hacer es en nuestro XAMPP iniciar el servicio de apache.

>11.- Abrimos nuestro navegador favorito (recomendamos Google Chrome o Mozilla Firefox).

>12.- Como url colocaremos lo siguiente _"localhost/"_ y podremos ver las carpetas que contiene nuestro proyecto. Si no deseamos ver las carpetas al final de la ruta añadimos _"/public"_ con lo que nos quedaria _"localhost/NombreProyecto/public/"_ y accederiamos a la pagina principal de nuestro proyecto.


# Despliegue 📦

Una manera de acceder a nuestro proyecto por el momento es a traves de los pasos previamente mencionados.
Tambien contamos con hosting a traves del link (https://mapamdj.epizy.com)

# Construido con 🛠️
Visual Studio Code - El editor de codigo que hemos utilizado para realizar el pryecto

# Versionado 📌
0.1.65

# Autores ✒️
Miguel Gras - Diseñador web, Programador front-end, Desarrollador back-end
Diego Soledispa - Diseñador web, Programador front-end, Desarrollador back-end
Juan Carlos Gundin - Diseñador web, Programador front-end, Desarrollador back-end

# Usuarios de entrada
>1.-User:
  >>user@gmail.com - qweQWE123
  
  >>user2@gmail.com - qweQWE123
  
  >>user3@gmail.com - qweQWE123
  
  >>user4@gmail.com - qweQWE123

>2.-Admin:
  >>admin@gmail.com - qweQWE123

# Expresiones de Gratitud 🎁
Agredecemos el envio de feedback sobre nuestro proyecto y todas la ideas para mejorar nuestro trabajo.
Muchas gracias por descargaros nuestro proyecto. Esperemos que os guste.
