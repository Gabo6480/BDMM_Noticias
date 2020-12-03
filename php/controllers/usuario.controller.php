<?php
    require './../models/usuario.model.php';
    
    class UsuarioController{

        function __construct(){
            
            "sp_usuarios_crear";
            "sp_usuarios_editar";
            "sp_usuarios_baja";

            "sp_login";

            "sp_get_one_usuarios";
            "sp_get_usuarios_rol";
            "sp_get_usuarios";
            "sp_get_usuarios_rol_activos";
            "sp_get_usuarios_activos";      
            "sp_get_avatar";
            "sp_get_usuarios_similares_activos";
        }

        /////////////////
        // POST METHOD //
        /////////////////
        function add(
            $Correo,
            $Foto,
            $Nombre,
            $telefono,
            $Contrasena,
            $Rol,
            $Activo
        ){
            require './../dbconnect.php';

            $fotoEscaped = mysqli_real_escape_string($conn, $Foto);
            $query = "call sp_usuarios_crear('$Correo','$fotoEscaped','$Nombre','$telefono','$Contrasena','$Rol',$Activo);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                header("Content-Type:application/json");
                echo json_encode($result->fetch_assoc());
                $result->free();
            }
            $conn->close();
        }
        function edit(
            $id_usuario,
            $Correo,
            $Foto,
            $Nombre,
            $Telefono,
            $Contrasena,
            $Rol,
            $Activo
        ){
            require './../dbconnect.php';
            $query = "call sp_usuarios_editar($id_usuario,'$Correo','$Foto','$Nombre','$Telefono','$Contrasena','$Rol',$Activo);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED'.mysqli_stmt_error($sentence));
            }

            if($result = $sentence->get_result()){

                header("Content-Type:application/json");
                echo json_encode($result->fetch_assoc());
                $result->free();
            }
            $conn->close();
        }
        function remove($id_usuario){
            require './../dbconnect.php';
            $query = "call sp_usuarios_baja($id_usuario);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED '.mysqli_stmt_error($sentence));
            }

            if($result = $sentence->get_result()){
                $result->free();

            }
            $conn->close();
        }
        function login($correo,$password){
            require './../dbconnect.php';
            $query = "call sp_login('$correo','$password');";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                header("Content-type:application/json");
                echo json_encode($result->fetch_assoc());
                $result->free();
            }
            $conn->close();
        }

        /////////////////
        // GET  METHOD //
        /////////////////
        function getOne($id_usuario){
            require './../dbconnect.php';
            $query = "call sp_get_one_usuarios($id_usuario);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                $row = $result->fetch_assoc();
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
            $conn->close();
        }
        function getRol($rol){
            require './../dbconnect.php';
            $query = "call sp_get_usuarios_rol('$rol');";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){

                $arr = array();
                while($usuario = $result->fetch_object("Usuario")){
                    array_push($arr, $usuario);
                }
                header("Content-type:application/json");
                echo json_encode($arr);
                $result->free();
            }
            $conn->close();
        }
        function getAll(){
            require './../dbconnect.php';
            $query = "call sp_get_usuarios();";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){

                $arr = array();
                while($usuario = $result->fetch_object("Usuario")){
                    array_push($arr, $usuario);
                }
                header("Content-type:application/json");
                echo json_encode($arr);
                $result->free();
            }
            $conn->close();
        }
        function getRolActivos($rol){
            require './../dbconnect.php';
            $query = "call sp_get_usuarios_rol_activos('$rol');";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){

                $arr = array();
                while($usuario = $result->fetch_object("Usuario")){
                    array_push($arr, $usuario);
                }
                header("Content-type:application/json");
                echo json_encode($arr);
                $result->free();
            }
            $conn->close();
        }
        function getAllActivos(){
            require './../dbconnect.php';
            $query = "call sp_get_usuarios_activos();";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){

                $arr = array();
                while($usuario = $result->fetch_object("Usuario")){
                    array_push($arr, $usuario);
                }
                header("Content-type:application/json");
                echo json_encode($arr);
                $result->free();
            }
            $conn->close();
        }
        function getAvatar($id){
            require './../dbconnect.php';
            $query = "call sp_get_avatar($id);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die('GET AVATAR: PREPARATION FAILED');
            }

            if(!$sentence->execute()){
                $conn->close();
                die('GET AVATAR: EXECUTION FAILED');
            }

            if($result = $sentence->get_result()){
                header("Content-type:text/plain");
                echo $result->fetch_assoc()['avatar'];
                $result->free();
            }
            $conn->close();
        }
        function search($nombre, $rol){
            require './../dbconnect.php';

            if($rol == "NULL")
                $query = "call sp_get_usuarios_similares_activos('$nombre', $rol);";
            else
                $query = "call sp_get_usuarios_similares_activos('$nombre', '$rol');";
            if(!($sentence = $conn->prepare($query))){
                die('GET AVATAR: PREPARATION FAILED'.mysqli_error($conn));
            }

            if(!$sentence->execute()){
                $conn->close();
                die('GET AVATAR: EXECUTION FAILED'.mysqli_stmt_error($sentence));
            }

            if($result = $sentence->get_result()){

                $arr = array();
                while($usuario = $result->fetch_object("Usuario")){
                    array_push($arr, $usuario);
                }
                header("Content-type:application/json");
                echo json_encode($arr);
                $result->free();
            }
            $conn->close();
        }
    }
?>