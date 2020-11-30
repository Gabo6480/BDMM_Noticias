<?php
require './../controllers/multimedia.controller.php';

if($mmController = new MultimediaController()){
    if($_SERVER["REQUEST_METHOD"] == "GET"){

        $action = $_GET['action'];
        $id     = $_GET['id'];

        switch($action){
            case "id":
                    $mmController->getById($id);
                break;
            case "article":
                    $mmController->getByArticleId($id);
                break;
        }
    }
    else if($_SERVER["REQUEST_METHOD"] == "POST"){
        $action = $_POST['action'];
        switch($action){
            case "add":
                    $fileType = $_FILES['archivo']['type'];
                    $fileData = addslashes(file_get_contents($_FILES['archivo']['tmp_name']));
                    $noticia  = $_POST['id'];

                    $mmController->add($fileType, $fileData, $noticia);
                break;
            case "remove":
                    $id = $_POST['id'];
                    
                    $mmController->remove($id);
                break;
        }
    } else{
        echo "Metodo no aceptado!";
    }
}