<?php
    $conn = new mysqli("127.0.0.1","root","","BDMM_DB");

    if($conn->connect_errno){
        echo "Fallo la conexion a la base de datos";
    }