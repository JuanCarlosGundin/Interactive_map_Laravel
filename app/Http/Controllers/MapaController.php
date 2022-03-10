<?php

namespace App\Http\Controllers;

use App\Models\Mapa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        $datos=DB::select('select * from tbl_localizaciones INNER JOIN tbl_icono on tbl_localizaciones.id_icono=tbl_icono.id where tipo_loc like ? or tipo_loc like ? or tipo_loc like ? or tipo_loc like ? or tipo_loc like ? or tipo_loc like ?',[$Monumento,$Museo,$Restaurante,$Metro,$Hotel,$Mercado]);
        return response()->json($datos);
    }

    //Zona Administrador
    public function vistaAdmin() {
        return view("admin");
    }

    public function leer(Request $req) {
        $datos = DB::table('tbl_localizaciones')->where('nom_loc','like',$req['filtro'].'%')->get();
        return response()->json($datos);
    }

    public function crear(Request $req){
        $datos = $req->except('_token','_method');
        //añadir fotos
        if($req->hasFile('foto_loc')){
            $datos['foto_loc'] = $req->file('foto_loc')->store('foto','public');
        }else{
            $datos['foto_loc'] = NULL;
        }
        if($req->hasFile('icono_loc')){
            $datos['icono_loc'] = $req->file('icono_loc')->store('icono','public');
        }else{
            $datos['icono_loc'] = NULL;
        }
        try{
            DB::table('tbl_localizaciones')->insert(["nom_loc"=>$datos['nom_loc'],"direccion_loc"=>$datos['direccion_loc'],"foto_loc"=>$datos['foto_loc'],"icono_loc"=>$datos['icono_loc'],"descripcion_loc"=>$datos['descripcion_loc'],"tipo_loc"=>$datos['tipo_loc']]);
            return response()->json(array('resultado'=> 'OK'));
        }catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }

    public function actualizar(Request $req, $id){
        $datos = $req->except('_token','_method');
        if ($req->hasFile('foto_loc')) {
            $foto = DB::table('tbl_localizaciones')->select('foto_loc')->where('id','=',$id)->first();
            if ($foto->foto_loc != null) {
                Storage::delete('public/'.$foto->foto_loc);
            }
            $datos['foto_loc'] = $req->file('foto_loc')->store('foto','public');
        }else{
            $foto = DB::table('tbl_localizaciones')->select('foto_loc')->where('id','=',$id)->first();
            $datos['foto_loc'] = $foto->foto_loc;
        }
        if ($req->hasFile('icono_loc')) {
            $icono = DB::table('tbl_localizaciones')->select('icono_loc')->where('id','=',$id)->first();
            if ($icono->icono_loc != null) {
                Storage::delete('public/'.$icono->icono_loc);
            }
            $datos['icono_loc'] = $req->file('icono_loc')->store('icono','public');
        }else{
            $icono = DB::table('tbl_localizaciones')->select('icono_loc')->where('id','=',$id)->first();
            $datos['icono_loc'] = $icono->icono_loc;
        }
        try{
            DB::beginTransaction();
            DB::table('tbl_localizaciones')->where('id','=',$id)->update(["nom_loc"=>$datos['nom_loc'],"direccion_loc"=>$datos['direccion_loc'],"foto_loc"=>$datos['foto_loc'],"icono_loc"=>$datos['icono_loc'],"descripcion_loc"=>$datos['descripcion_loc'],"tipo_loc"=>$datos['tipo_loc']]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        }catch (\Throwable $th) {
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    } 

    public function eliminar($id) {
        try {
            DB::beginTransaction();
            $foto = DB::table('tbl_localizaciones')->select('foto_loc')->where('id','=',$id)->first();
            if ($foto->foto_loc != null) {
                Storage::delete('public/'.$foto->foto_loc);
            }
            $icono = DB::table('tbl_localizaciones')->select('icono_loc')->where('id','=',$id)->first();
            if ($icono->icono_loc != null) {
                Storage::delete('public/'.$icono->icono_loc);
            }
            DB::table('tbl_localizaciones')->where('id','=',$id)->delete();
            DB::commit();
        }catch(\Exception $e) {
            DB::rollback();
            return $e->getMessage();
        }
    }
}
