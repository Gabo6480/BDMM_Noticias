<?php
    require './../dbconnect.php';
    require './likes.controller.php';

    if($_SERVER["REQUEST_METHOD"] == "GET"){
        $id_articulo = $_GET['id_articulo'];
        LikesController::instance($conn)->count($_GET[$id_articulo]);
    }
    else if($_SERVER["REQUEST_METHOD"] == "POST"){

        $option = $_POST['option'];
        $id_articulo = $_POST['id_articulo'];
        $id_usuario = $_POST['id_usario'];

        if($option == "add"){
            LikesController::instance($conn)->add($id_articulo, $id_usuario);
        }
        else if($option == "remove"){
            LikesController::instance($conn)->remove($id_articulo, $id_usuario);
        }
        else{
            echo "Opcion no valida!";
        }

    } else{
        echo "Metodo no aceptado!";
    }
?>