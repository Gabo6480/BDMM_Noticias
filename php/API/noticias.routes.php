<?php
    require './../controllers/noticias.controller.php';

    if($nc = new NoticiaController()){
        if($_SERVER["REQUEST_METHOD"] == "GET"){

            $action = $_GET['action'];
    
            switch ($action) {
                case 'getOne':
                        $id = $_GET['id'];
                        $nc->getById($id);
                    break;
                case 'getBySeccion':
                        $id = $_GET['id'];
                        $nc->getBySectionId($id);
                    break;
                case 'getByReportero':
                        $id = $_GET['id'];
                        $nc->getByReporteroId($id);
                    break;
                case 'getAll':
                        $nc->get();
                    break;
                case 'getByState':
                        $state = $_GET['state'];
                        $nc->getByState($state);
                    break;
                case 'getByStateSeccion':
                        $id = $_GET['id'];
                        $state = $_GET['state'];
                        $nc->getByStateSeccion($state, $id);
                    break;
                case 'getByStateReportero':
                        $id = $_GET['id'];
                        $state = $_GET['state'];
                        $nc->getByStateReportero($state, $id);
                    break;
                case 'getRelated':
                        $palabras = $_GET['palabras'];
                        $nc->getSimilar($palabras);
                    break;
                case 'getRelatedD':
                        $palabras = $_GET['palabras'];
                        $id       = $_GET['id'];
                        $nc->getSimilarD($id,$palabras);
                    break;
                case 'getRelatedDSL':
                        $palabras = $_GET['palabras'];
                        $id       = $_GET['id'];
                        $nc->getSimilarDSL($id,$palabras);
                    break;
                default:
                    break;
            }
        }
        else if($_SERVER["REQUEST_METHOD"] == "POST"){
    
            $action = $_POST['action'];
    
            switch ($action) {
                case 'add':
                        $estado    = $_POST['estado']    ;
                        $titulo    = $_POST['titulo']    ;
                        $resumen   = $_POST['resumen']   ;
                        $contenido = $_POST['contenido'] ;
                        $fecha     = $_POST['fecha']     ;
                        $ubicacion = $_POST['ubicacion'] ;
                        $palabras  = $_POST['palabras']  ;
                        $escritor  = $_POST['escritor']  ;
                        $seccion   = $_POST['seccion']   ;
                        $uController->add(
                            $estado   ,
                            $titulo   ,
                            $resumen  ,
                            $contenido,
                            $fecha    ,
                            $ubicacion,
                            $palabras ,
                            $escritor ,
                            $seccion  
                        );
                    break;
                case 'edit':
                        $id        = $_POST['id']        ;
                        $estado    = $_POST['estado']    ;
                        $titulo    = $_POST['titulo']    ;
                        $resumen   = $_POST['resumen']   ;
                        $contenido = $_POST['contenido'] ;
                        $fecha     = $_POST['fecha']     ;
                        $ubicacion = $_POST['ubicacion'] ;
                        $visitas   = $_POST['visitas']   ;
                        $palabras  = $_POST['palabras']  ;
                        $seccion   = $_POST['seccion']   ;
                        $uController->edit(
                            $id        ,
                            $estado    ,
                            $titulo    ,
                            $resumen   ,
                            $contenido ,
                            $fecha     ,
                            $ubicacion ,
                            $visitas   ,
                            $palabras  ,
                            $seccion   
                        );
                    break;
                case 'remove':
                        $id     = $_POST['id_usuario']  ;
                        $uController->remove($id);
                    break;
                case 'login':
                        $username = $_POST['username'];
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