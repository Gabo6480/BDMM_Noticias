<?php

    require './../dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "GET"){

        //Datos del articulo

        $noticia         = $_GET['id_noticia'];

        $formato = "call sp_likes_cuenta(%d);";

        $query = sprintf($formato,
            $noticia,
            $usuario);
        
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
                    echo $row['cuenta'];
                }
            
                mysqli_free_result($result);
            }
        }
        else{
            echo "Error, esto no jala";
        }
    }
?>