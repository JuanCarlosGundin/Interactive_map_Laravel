<?php

namespace App\Http\Controllers;

use App\Models\Mapa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MapaController extends Controller
{
    
    public function mapa() {
        return view("index");
    }

    public function mostrarmapas() {
        $datos = DB::table('tbl_localizaciones')->get();
        return response()->json($datos);
    }
}
