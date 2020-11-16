<?php

require './dbconnect.php';
//TODO
$rol       = $_GET["rol"];
$token    = $_GET["token"];

$format = "call sp_get_usuarios_rol('%s');";

$query = sprintf($format, $rol);

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
?>s