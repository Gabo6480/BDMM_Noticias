<?php

require './dbconnect.php';

$id       = $_GET["id_usuario"];
//TODO
$token    = $_GET["token"];

$format = "call sp_get_one_usuarios(%d);";

$query = sprintf($format,$id);

if(!($sentence = $conn->prepare($query))){
    echo "Fallo la preparacion del query";
}

if(!$sentence->execute()){
    echo "Fallo la ejecucion del query : ".$sentence->error;
}

if($result = $sentence->get_result()){

    if($result->num_rows > 0) 
    {
        $rows = array();
        while($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        echo json_encode($rows);

        mysqli_free_result($result);
    }
}
else{
    echo "El usuario o contrasena es incorrecto";
}
?>