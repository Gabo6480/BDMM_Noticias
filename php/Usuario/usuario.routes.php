<?php
    require './../dbconnect.php';
    require './usuario.controller.php';

    if($_SERVER["REQUEST_METHOD"] == "GET"){

        $option = $_GET['option'];

        switch ($option) {
            case 'getOne':
                    $id_usuario = $_GET['id_usuario'];
                    UsuarioController::instance($conn)->getOne($id_usuario);
                break;
            case 'getRol':
                    $id_rol = $_GET['id_rol'];
                    UsuarioController::instance($conn)->getRol($id_rol);
                break;
            case 'getAll':
                    UsuarioController::instance($conn)->getAll();
                break;
            default:
                break;
        }
    }
    else if($_SERVER["REQUEST_METHOD"] == "POST"){

        $option = $_POST['option'];

        switch ($option) {
            case 'add':
                    $correo = $_POST['correo']      ;
                    $foto   = $_POST['foto']        ;
                    $nombre = $_POST['nombre']      ;
                    $contra = $_POST['contra']      ;
                    $rol    = $_POST['rol']         ;
                    $activo = $_POST['activo']      ;
                    suarioController::instance($conn)->add(
                       $correo,
                       $foto,
                       $nombre,
                       $contra,
                       $rol,
                       $activo
                    ;
                break;
            case 'edit':
                    $id     = $_POST['id_usuario']  ;
                    $correo = $_POST['correo']      ;
                    $foto   = $_POST['foto']        ;
                    $nombre = $_POST['nombre']      ;
                    $contra = $_POST['contra']      ;
                    $rol    = $_POST['rol']         ;
                    $activo = $_POST['activo']      ;
                    UsuarioController::instance($conn)->edit(
                        $id,
                        $correo,
                        $foto,
                        $nombre,
                        $contra,
                        $rol,
                        $activo
                    );
                break;
            case 'remove':
                    $id     = $_POST['id_usuario']  ;
                    UsuarioController::instance($conn)->remove($id);
                break;
            case 'login':
                    $username = $_POST['username'];
                    $password  =$_POST['password'];
                    UsuarioController::instance($conn)->login(
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
?>