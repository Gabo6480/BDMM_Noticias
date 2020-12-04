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
                case 'search':
                        $search = $_GET['busqueda'];
                        $reportero = isset($_GET['reportero']) ? $_GET['reportero'] : "NULL";
                        $seccion = isset($_GET['seccion']) ? $_GET['seccion'] : "NULL";
                        $estado = isset($_GET['estado']) ? "'".$_GET['estado']."'" : "NULL";
                        $nc->search($search,$reportero,$seccion,$estado);
                        break;
                case 'popular':
                        $nc->popular();
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
                        $nc->add(
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
                        $id        = isset($_POST['id']        ) ? $_POST['id']        : "NULL";
                        $estado    = isset($_POST['estado']    ) ? "'".$_POST['estado']."'"    : "NULL";
                        $titulo    = isset($_POST['titulo']    ) ? "'".$_POST['titulo']."'"    : "NULL";
                        $foto      = isset($_POST['foto']      ) ? $_POST['foto']      : "NULL";
                        $resumen   = isset($_POST['resumen']   ) ? "'".$_POST['resumen']."'"   : "NULL";
                        $contenido = isset($_POST['contenido'] ) ? "'".$_POST['contenido']."'" : "NULL";
                        $ubicacion = isset($_POST['ubicacion'] ) ? "'".$_POST['ubicacion']."'" : "NULL";
                        $visitas   = isset($_POST['visitas']   ) ? $_POST['visitas']   : "NULL";
                        $palabras  = isset($_POST['palabras']  ) ? "'".$_POST['palabras']."'"  : "NULL";
                        $seccion   = isset($_POST['seccion']   ) ? $_POST['seccion']   : "NULL";
                        $nc->edit(
                            $id        ,
                            $estado    ,
                            $titulo    ,
                            $foto      ,
                            $resumen   ,
                            $contenido ,
                            $ubicacion ,
                            $visitas   ,
                            $palabras  ,
                            $seccion   
                        );
                    break;
                case 'remove':
                        $id     = $_POST['id']  ;
                        $nc->remove($id);
                    break;
                case 'estado':
                        $id = $_POST['id'];
                        $estado = $_POST['estado'];
                        $nc->estado(
                            $id,
                            $estado
                        );
                    break;
                case 'publicar':
                        $id = $_POST['id'];
                        $nc->publicar($id);
                default:
                    break;
            }
    
        } else{
            echo "Metodo no aceptado!";
        }
    }

    
?>