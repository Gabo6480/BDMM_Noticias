<?php
    require './../dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //Datos del articulo
        $Correo      = $_POST['correo'];
        $Foto        = $_POST['foto'];
        $Nombre      = $_POST['nombre'];
        $Contrasena  = $_POST['contrasena'];
        $Rol         = $_POST['rol'];
        $Activo      = 0;
        
        if($Rol == "usuario"){
            $Activo = 1;
        }

        $formato = "call sp_usuarios_crear('%s','%s','%s','%s','%s',%d);";

        $query = sprintf($formato,
            $Correo,
            base64_encode($Foto),
            $Nombre,
            $Contrasena,
            $Rol,
            $Activo
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