<?php

    require './../controllers/comentario.controller.php';


    if($commsController = new ComentariosController()){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $action = $_POST['action'];
            switch($action){
                case "add":
                        $contenido = $_POST['contenido'];
                        $padre = isset($_POST['padre'])? $_POST['padre'] : "NULL";
                        $noticia = $_POST['noticia'];
                        $usuario = $_POST['usuario'];
                        $commsController->add(
                            $contenido,
                            $padre,
                            $noticia,
                            $usuario
                        );
                    break;
                case "remove":
                        $id = $_POST['id'];
                        $commsController->remove(
                            $id
                        );
                    break;
                case "edit":
                        $id = $_POST['id'];
                        $contenido = $_POST['contenido'];
                        $commsController->edit($id, $contenido);
                    break;
            }
        }
        else if ($_SERVER['REQUEST_METHOD'] === 'GET'){
            $action = $_GET['action'];
            switch($action){
                case "getByArticle":
                        $id = $_GET['id'];
                        $commsController->getByArticle($id);
                    break;
            }
        }
    }

?>