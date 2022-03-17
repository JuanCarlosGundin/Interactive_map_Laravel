<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    public function login(){
        return view('login');
    }

    public function loginPost(Request $request){
        $datos_frm = $request->except('_token','_method');
        $mail_usu=$datos_frm['mail_usu'];
        $contra=$datos_frm['contra_usu'];
        $contra_usu=md5($contra);
        $id = DB::table("tbl_users")->where('mail_usu','=',$mail_usu)->where('contra_usu','=',$contra_usu)->first();
        $users = DB::table("tbl_users")->where('mail_usu','=',$mail_usu)->where('contra_usu','=',$contra_usu)->count();
        $tipouser = DB::table("tbl_users")->where('id_perfil','=','1')->where('mail_usu','=',$mail_usu)->count();
        if($users == 1 && $tipouser == 0){
            //Establecer la sesion
            $request->session()->put('mail_usu',$request->mail_usu);
            $request->session()->put('id_usu',$id->id);
            return redirect('mapa');
        }elseif($users == 1 && $tipouser == 1){
            $request->session()->put('mail_admin',$request->mail_usu);
            $request->session()->put('id_admin',$id->id);
            return redirect('admin');
        }else{
            //Redirigir al login
            return redirect('/');
        }
    }
    public function logout(Request $request){
        //Olvidas la sesion
        $request->session()->forget('mail_usu');
        $request->session()->forget('mail_admin');
        //Eliminar todo
        /* $request->session()->flush(); */
        return redirect('/');
    }
}
