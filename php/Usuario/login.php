<?php

    require './../dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        $correo = $_POST['id_usuario'];
        $pasword = $_POST['password'];

        $formato = "call sp_login('%s','%s');";

        $query = sprintf($formato, $correo, $password);
        
        if(!($sentence = $conn->prepare($query))){
            echo "Fallo la preparacion del query";
        }

        if(!$sentence->execute()){
            echo "Fallo la ejecucion del query : ".$sentence->error;
        }
    }
?>