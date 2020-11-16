<?php

    require './../dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //Datos del articulo

        $id         = $_POST['id_noticia'];
        $estado     = $_POST['estado'];
        $titulo     = $_POST['titulo'];
        $resumen    = $_POST['resumen'];
        $contenido  = $_POST['contenido'];
        $fecha      = $_POST['fecha'];
        $ubicacion  = $_POST['ubicacion'];
        $visitas    = $_POST['visitas'];
        $palabras   = $_POST['palabras'];
        $seccion    = $_POST['seccion'];
        $escritor   = $_POST['escritor'];

        $formato = "call sp_noticias_crear(%d,'%s','%s','%s','%s','%s','%s',%d,'%s',%d,%d);";

        $query = sprintf($formato,
            $id,
            $estado,
            $titulo,
            $resumen,
            $contenido,
            $fecha,
            $ubicacion,
            $visitas,
            $palabras,
            $seccion,
            $escritor);
        
        if(!($sentence = $conn->prepare($query))){
            echo "Fallo la preparacion del query";
        }

        if(!$sentence->execute()){
            echo "Fallo la ejecucion del query : ".$sentence->error;
        }

        if($result = $sentence->get_result()){
        
        
            if($result->num_rows > 0) 
            {
                while($row = $result->fetch_assoc()) {
                    echo $row['resultado'];
                }
            
                mysqli_free_result($result);
            }
        }
        else{
            echo "Error, esto no jala";
        }
    }
?>