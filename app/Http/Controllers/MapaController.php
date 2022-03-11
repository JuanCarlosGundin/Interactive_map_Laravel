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
         tbl_etiquetas.nom_etiqueta like ?',[$id,"%".$etiqueta."%"]);}
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
        try{
            DB::table('tbl_localizaciones')->insert(["nom_loc"=>$datos['nom_loc'],"direccion_loc"=>$datos['direccion_loc'],"descripcion_loc"=>$datos['descripcion_loc'],"tipo_loc"=>$datos['tipo_loc']]);
            return response()->json(array('resultado'=> 'OK'));
        }catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }

    public function actualizar(Request $req, $id){
        $datos = $req->except('_token','_method');
        try{
            DB::beginTransaction();
            DB::table('tbl_localizaciones')->where('id','=',$id)->update(["nom_loc"=>$datos['nom_loc'],"direccion_loc"=>$datos['direccion_loc'],"descripcion_loc"=>$datos['descripcion_loc'],"tipo_loc"=>$datos['tipo_loc']]);
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
            DB::table('tbl_localizaciones')->where('id','=',$id)->delete();
            DB::commit();
        }catch(\Exception $e) {
            DB::rollback();
            return $e->getMessage();
        }
    }
    //Consulta tabla salas
    public function gincanaPOST(Request $request){
        $id=session()->get('id_usu');
        $valor= $request->input('valor');
        $nom_sala= $request->input('nom_sala');
        $contra_sala= $request->input('contra_sala');
        if($valor=="unirse"){
            $datos = DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->where('contra_sala','=',$contra_sala)->where('estado_sala','=',"0")->count();
            if($datos==0){
                return response()->json(array('resultado'=> 'NOKunirse'));
            }else{
                $idsala= DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->where('contra_sala','=',$contra_sala)->where('estado_sala','=',"0");
                $request->session()->put('id_sala',$idsala->id);
                $id_jug2 = DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->whereNotNull('id_jug2')->count();
                if ($id_jug2==0) {
                    DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->update(["id_jug2"=>$id]);
                    $jugadores=DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->first();
                    return response()->json(array('resultado'=> 'OK'));
                }else{
                    DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->update(["id_jug3"=>$id]);
                    $jugadores=DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->first();
                    return response()->json(array('resultado'=> 'OK'));
                }
            }
        }else{
            
            $datos = DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->count();
            if ($datos==0) {
                $idsala= DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->where('contra_sala','=',$contra_sala)->where('estado_sala','=',"0");
                $request->session()->put('id_sala',$idsala->id);
                DB::table('tbl_sala')->insert(["nom_sala"=>$nom_sala,"contra_sala"=>$contra_sala,"id_creador"=>$id,"estado_sala"=>0,"id_juego"=>1]);
                return response()->json(array('resultado'=> 'OK'));
            }else{
                return response()->json(array('resultado'=> 'NOKcrear'));
            }
        }
    }

    public function recargaSala(){
        $id_sala=session()->get('id_sala');
        $id_creador=DB::table('tbl_sala')->join('tbl_users','tbl_users.id', '=', 'tbl_sala.id_creador')->where('id','=',$id_sala)->first();
        return response()->json(array('resultado'=> $id_creador));
        /*$id_jug2 = DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->whereNotNull('id_jug2')->count();
        if (condition) {
            # code...
        }*/

    }
}