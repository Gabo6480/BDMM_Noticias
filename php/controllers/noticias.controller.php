<?php
    

class NoticiaController{

    //inyectar dependencia
    function __construct(){

        //Solo para tener referencia de los procedures existentes

        'sp_add_noticia';
        'sp_editar_noticia';
        'sp_eliminar_noticia';

        'sp_noticia_by_seccion';
        'sp_noticia_by_reportero';
        'sp_noticia_by_id';
        'sp_noticia_get';
        'sp_noticia_get_estado';
        'sp_noticia_get_estado_reportero';
        'sp_noticia_get_estado_seccion';
    }

    /////////////////
    // GET METHODS //
    /////////////////
    function getBySectionId($id){
        require './../dbconnect.php';
        $query = "call sp_noticia_by_seccion($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            while($row = $result->fetch_assoc()){
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
        }
        $conn->close();
    }
    function getByReporteroId($id){
        require './../dbconnect.php';
        $query = "call sp_noticia_by_reportero($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            while($row = $result->fetch_assoc()){
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
        }
        $conn->close();
    }
    function getById($id){
        require './../dbconnect.php';
        $query = "call sp_noticia_by_id($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            while($row = $result->fetch_assoc()){
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
        }
        $conn->close();
    }
    function getByState($estado){
        require './../dbconnect.php';
        $query = "call sp_noticia_get_estado('$estado');";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            while($row = $result->fetch_assoc()){
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
        }
        $conn->close();
    }
    function getByStateReportero($estado,$reportero){
        require './../dbconnect.php';
        $query = "call sp_noticia_get_estado_reportero('$estado',$reportero);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            while($row = $result->fetch_assoc()){
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
        }
        $conn->close();
    }
    function getByStateSeccion($estado,$seccion){
        require './../dbconnect.php';
        $query = "call sp_noticia_get_estado_seccion('$estado',$seccion);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            while($row = $result->fetch_assoc()){
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
        }
        $conn->close();
    }
    function get(){
        require './../dbconnect.php';
        $query = "call sp_noticia_get();";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            while($row = $result->fetch_assoc()){
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
        }
        $conn->close();
    }

    //////////////////
    // POST METHODS //
    //////////////////
    function add(
        $estado, 
        $titulo, 
        $resumen, 
        $contenido, 
        $fecha, 
        $ubicacion, 
        $palabras, 
        $escritor, 
        $seccion 
    ){
        require './../dbconnect.php';
        $query = "call sp_add_noticia('$estado','$titulo','$resumen', '$contenido','$fecha', '$ubicacion', '$palabras', $escritor, $noticia);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
        $conn->close();
    }
    function edit(
        $id,
        $estado, 
        $titulo, 
        $resumen, 
        $contenido, 
        $fecha, 
        $ubicacion,
        $visitas, 
        $palabras, 
        $seccion
    )
    {
        require './../dbconnect.php';
        $query = "call sp_editar_noticia($id,'$estado','$titulo','$resumen', '$contenido','$fecha', '$ubicacion',$visitas, '$palabras', $escritor, $noticia);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
        $conn->close();
    }
    function remove($id){
        require './../dbconnect.php';
        $query = "call sp_eliminar_noticia($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
        $conn->close();
    }
}