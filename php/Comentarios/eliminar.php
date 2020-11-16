<?php

    require './../dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //Datos del articulo
        $idcomentario    = $_POST['id_comentario'];

        $formato = "call sp_comentarios_eliminar(%d);";

        $query = sprintf($formato,
            $idcomentario
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