<?php

    require './../dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //Datos del articulo
        $idusuario    = $_POST['idusuario'];

        $formato = "call sp_usuarios_baja(%d);";

        $query = sprintf($formato, $idusuario);
        
        if(!($sentence = $conn->prepare($query))){
            echo "Fallo la preparacion del query";
        }

        if(!$sentence->execute()){
            echo "Fallo la ejecucion del query : ".$sentence->error;
        }
    }
?>