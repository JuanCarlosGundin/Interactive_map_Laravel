<?php

use App\Http\Controllers\MapaController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Login
Route::get('/',[UsuarioController::class, 'login']);
Route::post('loginPost',[UsuarioController::class,'loginPost']);
Route::get('logout',[UsuarioController::class,'logout']);

//Acceder a Vista Mapa
Route::get('mapa',[MapaController::class,'mapa']);
//mostrar markers del mapa
Route::post('mostrarmapas',[MapaController::class,'mostrarmapas']);

//mostrar markers favoritos 
Route::post('mostrarfavorito',[MapaController::class,'mostrarfavorito']);
Route::post('comprobarfav',[MapaController::class,'comprobarfav']);
Route::post('anadirfav',[MapaController::class,'anadirfav']);
Route::post('borrarfav',[MapaController::class,'borrarfav']);

//crud administrador
//Acceder a vista Admin
Route::get('admin',[MapaController::class,'vistaAdmin']);

//leerJS
Route::post('leer',[MapaController::class,'leer']);

//eliminarJS
Route::delete('eliminar/{id}',[MapaController::class,'eliminar']);

//crearJS
Route::post('crear',[MapaController::class,'crear']);

//actualizarJS
Route::put('actualizar/{id}',[MapaController::class,'actualizar']);

//Gincana
Route::post('gincanaPOST',[MapaController::class,'gincanaPOST']);
Route::post('recargaSala',[MapaController::class,'recargaSala']);
Route::post('empezarPartida',[MapaController::class,'empezarPartida']);
Route::post('checkloc',[MapaController::class,'checkloc']);
Route::post('verificar',[MapaController::class,'verificar']);

//añadir etiqueta
Route::post('anadiretiqueta',[MapaController::class,'anadiretiqueta']);