<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function show(Usuario $usuario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario $usuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuario $usuario)
    {
        //
    }
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
}
