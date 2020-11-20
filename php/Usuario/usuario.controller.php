<?php

    require './usuario.model.php';
    
    class UsuarioController{
        private static $instance;

        private $conn;

        private $altaProcedure;
        private $editarProcedure;
        private $bajaProcedure;

        private $getOneProcedure;
        private $getRolProcedure;
        private $getAllProcedure;

        private $loginProcedure;

        //Inyectar dependencia
        function __construct($conn){

            if($conn){
                $this->$conn =& $conn;

                $this->$altaProcedure    ="sp_usuarios_crear";
                $this->$editarProcedure  ="sp_usuarios_editar";
                $this->$bajaProcedure    ="sp_usuarios_baja";

                $this->$getOneProcedure  ="sp_get_one_usuarios";
                $this->$getRolProcedure  ="sp_removeLike";
                $this->$getAllProcedure  ="sp_get_usuarios";

                $this->$loginProcedure   ="sp_login";
            }
        }

        public static function instance($conn = NULL){

            if(!self::$instance instanceof self){
                self::$instance = new self($conn);
            }

            return self::$instance;
        }

        function add(
            $Correo,
            $Foto,
            $Nombre,
            $Contrasena,
            $Rol,
            $Activo
        ){
            $format = "call %s('%s','%s','%s','%s','%s',%d);";

            $query = sprintf($format,
                $altaProcedure,
                $Correo,
                $Foto,
                $Nombre,
                $Contrasena,
                $Rol,
                $Activo
            );

            if(!($sentence = $this->$conn->prepare($query))){
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                echo $result->fetch_assoc()["RESULT"];
            }
            else{
                echo 'NO HAY RESULTADOS';
            }
        }

        function remove($id_usuario){
            $format = "call %s(%d);";

            $query = sprintf($format,
                $getOneProcedure,
                $id_usuario
            );

            if(!($sentence = $this->$conn->prepare($query))){
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                echo $result->fetch_assoc()["RESULT"];
            }
            else{
                echo 'NO HAY RESULTADOS';
            }
        }

        function edit(
            $id_usuario
            $Correo,
            $Foto,
            $Nombre,
            $Contrasena,
            $Rol,
            $Activo
        ){
            $format = "call %s(%d,'%s','%s','%s','%s','%s',%d);";

            $query = sprintf($format,
                $editarProcedure,
                $id_usuario,
                $Correo,
                $Foto,
                $Nombre,
                $Contrasena,
                $Rol,
                $Activo
            );

            if(!($sentence = $this->$conn->prepare($query))){
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                echo $result->fetch_assoc()["RESULT"];
            }
            else{
                echo 'NO HAY RESULTADOS';
            }
        }

        function getOne($id_usuario){
        
            $format = "call %s(%d);";

            $query = sprintf($format,
                $getOneProcedure,
                $id_usuario
            );

            if(!($sentence = $this->$conn->prepare($query))){
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                $usuario = $result->fetch_object("Usuario");
                echo $usuario->toJson();
            }
            else{
                echo 'NO HAY RESULTADOS';
            }
        }

        function getRol($id_rol){
            
            $format = "call %s(%d);";

            $query = sprintf($format,
                $getRolProcedure,
                $id_rol
            );

            if(!($sentence = $this->$conn->prepare($query))){
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){

                $arr = array();
                while($usuario = $result->fetch_object("Usuario")){
                    array_push($arr, $usuario);
                }

                echo json_encode($arr);
            }
            else{
                echo 'NO HAY RESULTADOS';
            }
        }

        function getAll(){
            
            $format = "call %s();";

            $query = sprintf($format,
                $getAllProcedure
            );

            if(!($sentence = $this->$conn->prepare($query))){
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){

                $arr = array();
                while($usuario = $result->fetch_object("Usuario")){
                    array_push($arr, $usuario);
                }

                echo json_encode($arr);
            }
            else{
                echo 'NO HAY RESULTADOS';
            }
        }

        function login($correo,$password){
            $format = "call %s('%s','%s');";

            $query = sprintf($format,
                $loginProcedure,
                $correo,
                $password
            );

            if(!($sentence = $this->$conn->prepare($query))){
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                echo $result->fetch_assoc()["RESULT"];
            }
            else{
                echo 'NO HAY RESULTADOS';
            }
        }
    }
?>