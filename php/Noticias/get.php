<?php

require './dbconnect.php';
//TODO
$token    = $_GET["token"];

$query = "call sp_get_noticias();";

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
            echo $row['usuario'];
            header('Location: video.html?username='.$username);
        }

        mysqli_free_result($result);
    }
}
else{
    echo "El usuario o contrasena es incorrecto";
}
?>