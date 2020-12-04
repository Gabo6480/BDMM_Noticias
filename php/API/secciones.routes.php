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
            else if($action === 'byid'){
                $id = $_GET['id'];
                $sc->byId($id);
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
                        $id,
                        $nombre,
                        $color,
                        $orden
                    );
                    break;
                case 'remove':
                        $id     = $_POST['id']  ;
                        $sc->remove($id);
                    break;
                case 'increment':
                        $id = $_POST['id'];
                        $sc->increment($id);
                    break;
                case 'decrement':
                        $id = $_POST['id'];
                        $sc->decrement($id);
                    break;
                default:
                    break;
            }
    
        } else{
            echo "Metodo no aceptado!";
        }
    }

    
?>