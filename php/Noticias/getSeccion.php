<?php

require './dbconnect.php';

$idSeccion = $_GET["idSeccion"];
//TODO
$token    = $_GET["token"];

$query = "call sp_get_noticias_seccion(".idSeccion.");";

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
    echo "Error, esto no jala";
}