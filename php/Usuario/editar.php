<?php

    require './../dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //Datos del articulo
        $idusuario  = $_POST['id_usuario'];
        $correo     = $_POST['correo'];
        $foto       = $_POST['foto'];
        $nombre     = $_POST['nombre'];
        $contra     = $_POST['contra'];
        $rol        = $_POST['rol'];
        $activo     = $_POST['activo'];

        $formato = "call sp_usuarios_editar(%d,'%s','%s','%s','%s','%s',%d);";

        $query = sprintf($formato,
            $idusuario,
            $correo,
            $foto,
            $nombre,
            $contra,
            $rol,
            $activo
        );
        
        if(!($sentence = $conn->prepare($query))){
            echo "Fallo la preparacion del query";
        }

        if(!$sentence->execute()){
            echo "Fallo la ejecucion del query : ".$sentence->error;
        }
    }
?>