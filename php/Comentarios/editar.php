<?php

    require './../dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //Datos del articulo
        $idcomentario    = $_POST['id_comentario'];
        $Contenido   = $_POST['contenido'];
        $Fecha       = $_POST['fecha'];
        $Padre       = $_POST['padre'];
        $noticia     = $_POST['id_noticia'];
        $usuario     = $_POST['id_usuario'];

        $formato = "call sp_comentarios_editar(%d,'%s','%s',%d,%d,%d);";

        $query = sprintf($formato,
            $idcomentario,
            $Id,
            $Contenido,
            $Fecha,
            $Padre,
            $noticia,
            $usuario
        s);
        
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