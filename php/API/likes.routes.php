<?php
    require './../controllers/likes.controller.php';

    if($likesController = new LikesController()){
        if($_SERVER["REQUEST_METHOD"] == "GET"){
            $id = $_GET['id'];
            $likesController->count($id);
        }
        else if($_SERVER["REQUEST_METHOD"] == "POST"){
    
            $action = $_POST['action'];
            $id_articulo = $_POST['id_articulo'];
            $id_usuario = $_POST['id_usario'];
    
            if($action == "add"){
                $likesController->add($id_articulo, $id_usuario);
            }
            else if($action == "remove"){
                $likesController->remove($id_articulo, $id_usuario);
            }
            else{
                echo "Opcion no valida!";
            }
    
        } else{
            echo "Metodo no aceptado!";
        }
    }
    
?>