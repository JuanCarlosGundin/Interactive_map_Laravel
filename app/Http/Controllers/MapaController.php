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
         INNER JOIN tbl_icono on tbl_localizaciones.id_icono=tbl_icono.id
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
         INNER JOIN tbl_icono on tbl_localizaciones.id_icono=tbl_icono.id
         where 
         tbl_users.id = ? and
         tbl_etiquetas.nom_etiqueta like ?',[$id,"%".$etiqueta."%"]);}
        return response()->json($datos);
    }
    //mostrar favorito
    public function mostrarfavorito(Request $request) {
        $id= $request->input('id');
        $datos=DB::select('select * from tbl_favoritos
        INNER JOIN tbl_localizaciones ON tbl_favoritos.id_localizacion = tbl_localizaciones.id 
        INNER JOIN tbl_users ON tbl_favoritos.id_user = tbl_users.id 
        INNER JOIN tbl_icono on tbl_localizaciones.id_icono=tbl_icono.id 
        where 
        tbl_favoritos.id_user = ?'
        ,[$id]);
        return response()->json($datos);
    }
    //comprobar que esta en favoritos (filtro)
    public function comprobarfav(Request $request) {
        $id= $request->input('id_usu');
        $nombre= $request->input('nombre');
        $datos=DB::select('select * from tbl_favoritos
        INNER JOIN tbl_localizaciones ON tbl_favoritos.id_localizacion = tbl_localizaciones.id 
        INNER JOIN tbl_users ON tbl_favoritos.id_user = tbl_users.id 
        where 
        tbl_favoritos.id_user = ? and tbl_localizaciones.nom_loc like ?'
        ,[$id,'%'.$nombre.'%']);
        return response()->json($datos);
    }
    //añadir a favoritos
    public function anadirfav(Request $request) {
        $id= $request->input('id_usu');
        $nombre= $request->input('nombre');
        try{
        DB::beginTransaction();
        $id_loc=DB::select('select id from tbl_localizaciones
        where nom_loc like ?'
        ,['%'.$nombre.'%']);
        //DB::table('tbl_favoritos')->insert(["id_user"=>$id,"direccion_loc"=>$id_loc['id']]);
        DB::table('tbl_favoritos')->insert(["id_user"=>$id,"id_localizacion"=>$id_loc[0]->{'id'}]);
        DB::commit();
        //return response()->json($id_loc);
        return response()->json(array('resultado'=> 'OK'));
        }catch (\Throwable $th){
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));

        }
        //return response()->json($id_loc);
    }

    //borrar fav
    public function borrarfav(Request $request) {
        $id= $request->input('id_usu');
        $nombre= $request->input('nombre');
        try{
        DB::beginTransaction();
        $id_loc=DB::select('select id from tbl_localizaciones
        where nom_loc like ?'
        ,['%'.$nombre.'%']);
        $delete= array('id_user'=>$id,'id_localizacion'=>$id_loc[0]->{'id'});
        //DB::table('tbl_favoritos')->insert(["id_user"=>$id,"id_localizacion"=>$id_loc[0]->{'id'}]);
        DB::table('tbl_favoritos')->where($delete)->delete();
        DB::commit();
        //return response()->json($id_loc);
        return response()->json(array('resultado'=> 'OK'));
        }catch (\Throwable $th){
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));

        }
        //return response()->json($id_loc);
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
        try{
            DB::table('tbl_localizaciones')->insert(["nom_loc"=>$datos['nom_loc'],"direccion_loc"=>$datos['direccion_loc'],"foto_loc"=>$datos['foto_loc'],"id_icono"=>$datos['id_icono'],"descripcion_loc"=>$datos['descripcion_loc'],"tipo_loc"=>$datos['tipo_loc']]);
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
        try{
            DB::beginTransaction();
            DB::table('tbl_localizaciones')->where('id','=',$id)->update(["nom_loc"=>$datos['nom_loc'],"direccion_loc"=>$datos['direccion_loc'],"foto_loc"=>$datos['foto_loc'],"id_icono"=>$datos['id_icono'],"descripcion_loc"=>$datos['descripcion_loc'],"tipo_loc"=>$datos['tipo_loc']]);
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
                $id_jug2 = DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->whereNotNull('id_jug2')->count();
                $id_jug3 = DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->whereNotNull('id_jug3')->count();
                if ($id_jug2==0) {
                    DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->update(["id_jug2"=>$id]);
                    $idsala= DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->where('estado_sala','=',"0")->first();
                    $request->session()->put('id_sala',$idsala->id);
                    return response()->json(array('resultado'=> 'OK'));
                }else if ($id_jug3==0){
                    DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->update(["id_jug3"=>$id]);
                    $idsala= DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->where('estado_sala','=',"0")->first();
                    $request->session()->put('id_sala',$idsala->id);
                    return response()->json(array('resultado'=> 'OK'));
                }else{
                    return response()->json(array('resultado'=> 'NOKunirse'));
                }
            }
        }else{
            
            $datos = DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->count();
            if ($datos==0) {
                DB::table('tbl_sala')->insert(["nom_sala"=>$nom_sala,"contra_sala"=>$contra_sala,"id_creador"=>$id,"estado_sala"=>0,"id_juego"=>1]);
                $idsala= DB::table('tbl_sala')->where('nom_sala','=',$nom_sala)->where('estado_sala','=',"0")->first();
                $request->session()->put('id_sala',$idsala->id);
                return response()->json(array('resultado'=> 'OK'));
            }else{
                return response()->json(array('resultado'=> 'NOKcrear'));
            }
        }
    }

    public function recargaSala(){
        $pistas=DB::select("SELECT * FROM tbl_juego where id='1';");
        $id_sala=session()->get('id_sala');
        $id_usu=session()->get('id_usu');
        $elementos = [];
        $consulta_creador=DB::select("SELECT * FROM tbl_sala inner join tbl_users on tbl_users.id=tbl_sala.id_creador where tbl_sala.id=?",[$id_sala]);
        $consulta_jug2=DB::select("SELECT * FROM tbl_sala inner join tbl_users on tbl_users.id=tbl_sala.id_jug2 where tbl_sala.id=?",[$id_sala]);
        $consulta_jug3=DB::select("SELECT * FROM tbl_sala inner join tbl_users on tbl_users.id=tbl_sala.id_jug3 where tbl_sala.id=?",[$id_sala]);
        array_push($elementos, $consulta_creador, $consulta_jug2, $consulta_jug3);
        return response()->json(array('id_usu'=> $id_usu, 'pistas'=>$pistas ,'elementos'=>json_encode($elementos)));

    }

    public function partida(){
        $id_sala=session()->get('id_sala');
        $id_usu=session()->get('id_usu');
        $consulta_creador=DB::select("SELECT * FROM tbl_sala inner join tbl_users on tbl_users.id=tbl_sala.id_creador where tbl_sala.id=?",[$id_sala]);
        if ($id_usu==$consulta_creador[0]->id_creador){
            DB::table('tbl_sala')->where('id','=',$id_sala)->update(["estado_sala"=>'1']);
        }
        return response()->json(array('resultado'=> 'OK'));
    }
}
