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

    public function mostrarmapas(Request $request) {
        $Monumento = $request->input('Monumento');
        $Museo = $request->input('Museo');
        $Restaurante= $request->input('Restaurante');
        $Metro = $request->input('Metro');
        $Hotel = $request->input('Hotel');
        $Mercado = $request->input('Mercado');
        $datos=DB::select('select * from tbl_localizaciones where tipo_loc like ? or tipo_loc like ? or tipo_loc like ? or tipo_loc like ? or tipo_loc like ? or tipo_loc like ?',[$Monumento,$Museo,$Restaurante,$Metro,$Hotel,$Mercado]);
        return response()->json($datos);
    }
}
