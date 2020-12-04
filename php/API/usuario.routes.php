<?php
    require './../controllers/usuario.controller.php';

    if($uController = new UsuarioController()){
        if($_SERVER["REQUEST_METHOD"] == "GET"){

            $action = $_GET['action'];
    
            switch ($action) {
                case 'getOne':
                        $id_usuario = $_GET['id'];
                        $uController->getOne($id_usuario);
                    break;
                case 'getRol':
                        $id_rol = $_GET['id'];
                        $uController->getRol($id_rol);
                    break;
                case 'getAll':
                        $uController->getAll();
                    break;
                case 'getRolActivos':
                        $id_rol = $_GET['id'];
                        $uController->getRolActivos($id_rol);
                    break;
                case 'getActivos':
                        $uController->getAllActivos();
                    break;
                case 'getAvatar':
                        $id = $_GET['id'];
                        $uController->getAvatar($id);
                    break;
                case 'search':
                        $busqueda = isset($_GET['busqueda'])? $_GET['busqueda'] : "";
                        $rol = isset($_GET['rol'])? $_GET['rol'] : "NULL";
                        $uController->search($busqueda,$rol);
                    break;
                default:
                    break;
            }
        }
        else if($_SERVER["REQUEST_METHOD"] == "POST"){
    
            $action = $_POST['action'];
    
            switch ($action) {
                case 'add':
                        $correo   = $_POST['correo']      ;
                        $foto     = $_POST['foto']        ;
                        $nombre   = $_POST['nombre']      ;
                        $telefono = $_POST['telefono']    ;
                        $contra   = $_POST['contra']      ;
                        $rol      = $_POST['rol']         ;
                        $activo   = $_POST['activo']      ;
                        $uController->add(
                           $correo,
                           $foto,
                           $nombre,
                           $telefono,
                           $contra,
                           $rol,
                           $activo
                        );
                    break;
                    
                case 'edit':
                        $correo   = isset($_POST['correo'])   ? $_POST['correo']   : "NULL" ;
                        $foto     = isset($_POST['foto'])     ? $_POST['foto']     : "NULL" ;
                        $nombre   = isset($_POST['nombre'])   ? $_POST['nombre']   : "NULL" ;
                        $telefono = isset($_POST['telefono']) ? $_POST['telefono'] : "NULL"  ;
                        $contra   = isset($_POST['contra'])   ? $_POST['contra']   : "NULL" ;
                        $rol      = isset($_POST['rol'])      ? $_POST['rol']      : "NULL";
                        $activo   = isset($_POST['activo'])   ? $_POST['activo']   : "NULL" ;
                        $uController->edit(
                            $id,
                            $correo,
                            $foto,
                            $nombre,
                            $telefono,
                            $contra,
                            $rol,
                            $activo
                        );
                    break;
                case 'remove':
                        $id     = $_POST['id'];
                        $uController->remove($id);
                    break;
                case 'login':
                        $username = $_POST['email'];
                        $password = $_POST['password'];
                        $uController->login(
                            $username,
                            $password
                        );
                    break;
                default:
                    break;
            }
    
        } else{
            echo "Metodo no aceptado!";
        }
    }

    
?>