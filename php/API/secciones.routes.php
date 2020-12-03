<?php
    require './../controllers/secciones.controller.php';

    if($sc = new SeccionesController()){
        if($_SERVER["REQUEST_METHOD"] == "GET"){

            $action = $_GET['action'];
            if($action === 'get'){
                $sc->get();
            }
            else if($action === 'getActive'){
                $sc->getActivas();
            }
            else if($action === 'search'){
                $search = $_GET['search'];
                $sc->search($search);
            }
           
        }
        else if($_SERVER["REQUEST_METHOD"] == "POST"){
    
            $action = $_POST['action'];
    
            switch ($action) {
                case 'add':
                        $nombre    = $_POST['nombre'];
                        $color     = $_POST['color'] ;
                        $orden     = $_POST['orden'] ;
                        $sc->add(
                            $nombre,
                            $color,
                            $orden
                        );
                    break;
                case 'edit':
                    $id        = $_POST['id']    ;
                    $nombre    = $_POST['nombre'];
                    $color     = $_POST['color'] ;
                    $orden     = $_POST['orden'] ;
                    $sc->edit(
                        $nombre,
                        $color,
                        $orden
                    );
                    break;
                case 'remove':
                        $id     = $_POST['id_usuario']  ;
                        $sc->remove($id);
                    break;
                default:
                    break;
            }
    
        } else{
            echo "Metodo no aceptado!";
        }
    }

    
?>