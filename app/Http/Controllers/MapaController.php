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
        $id= $request->input('id');
        $etiqueta= $request->input('etiqueta');
        $Monumento = $request->input('Monumento');
        $Museo = $request->input('Museo');
        $Restaurante= $request->input('Restaurante');
        $Metro = $request->input('Metro');
        $Hotel = $request->input('Hotel');
        $Mercado = $request->input('Mercado');
        if($etiqueta==666){
        $datos=DB::select('select * from tbl_localizaciones
         where tipo_loc like ? or 
         tipo_loc like ? or 
         tipo_loc like ? or 
         tipo_loc like ? or 
         tipo_loc like ? or 
         tipo_loc like ?'
         ,[$Monumento,$Museo,$Restaurante,$Metro,$Hotel,$Mercado]);
        }else{
         $datos=DB::select('select * from tbl_etiquetas
         INNER JOIN tbl_localizaciones ON tbl_etiquetas.id_localizacion = tbl_localizaciones.id 
         INNER JOIN tbl_users ON tbl_etiquetas.id_user = tbl_users.id 
         where 
         tbl_users.id = ? and
         tbl_etiquetas.nom_etiqueta like ?'
         ,[$id,"%".$etiqueta."%"]);}
        return response()->json($datos);
    }
}
