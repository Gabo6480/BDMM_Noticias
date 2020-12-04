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

        'sp_get_similar';
        'sp_get_similar_distintos_a';
        'sp_get_similar_distintos_a_sl';

        //busqueda
        'sp_get_nombre_similar';
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
            die("Multimedia getBySectionId: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia getBySectionId: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function getByReporteroId($id){
        require './../dbconnect.php';
        $query = "call sp_noticia_by_reportero($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia getByReporteroId: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia getByReporteroId: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function getById($id){
        require './../dbconnect.php';
        $query = "call sp_noticia_by_id($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia getById: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia getById: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            if($row = $result->fetch_assoc()){
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
            die("Multimedia getByState: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia getByState: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function getByStateReportero($estado,$reportero){
        require './../dbconnect.php';
        $query = "call sp_noticia_get_estado_reportero('$estado',$reportero);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia getByStateReportero: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia getByStateReportero: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function getByStateSeccion($estado,$seccion){
        require './../dbconnect.php';
        $query = "call sp_noticia_get_estado_seccion('$estado',$seccion);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia getByStateSeccion: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia getByStateSeccion: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function getSimilar($palabras){
        require './../dbconnect.php';
        $query = "call sp_get_similar('$palabras');";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia getSimilar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia getSimilar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function getSimilarD($id,$palabras){
        require './../dbconnect.php';
        $query = "call sp_get_similar_distintos_a($id,'$palabras');";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia getSimilarD: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia getSimilarD: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function getSimilarDSL($id,$palabras){
        require './../dbconnect.php';
        $query = "call sp_get_similar_distintos_a_sl($id,'$palabras');";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia getSimilarDSL: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            die("Multimedia getSimilarDSL: Fallo la ejecucion del query" .mysqli_error($conn));
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function get(){
        require './../dbconnect.php';
        $query = "call sp_noticia_get();";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia get: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia get: Fallo la ejecucion del query".mysqli_stmt_error($sentence));
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);

            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function search($titulo, $escritor, $seccion,$estado){
        require './../dbconnect.php';
        $query = "call sp_get_nombre_similar('$titulo',$escritor, $seccion,$estado);";
        if (!($sentence = $conn->prepare($query)))
        {
            //$conn->close();
            die("Multimedia get: Fallo la preparacion del query".mysqli_error($conn));
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia get: Fallo la ejecucion del query".mysqli_stmt_error($sentence));
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);
            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
        $conn->close();
    }
    function popular(){
        require './../dbconnect.php';
        $query = "call sp_getPopular();";
        if (!($sentence = $conn->prepare($query)))
        {
            //$conn->close();
            die("Multimedia popular: Fallo la preparacion del query".mysqli_error($conn));
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia popular: Fallo la ejecucion del query".mysqli_stmt_error($sentence));
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr,$row);
            }

            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
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
        $query = "call sp_add_noticia('$estado','$titulo','$resumen', '$contenido','$fecha', '$ubicacion', '$palabras', $escritor, $seccion);";

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
        $foto,
        $resumen, 
        $contenido, 
        $ubicacion,
        $visitas, 
        $palabras, 
        $seccion
    )
    {
        require './../dbconnect.php';
        $query = "call sp_editar_noticia($id,$estado,$titulo, $foto,$resumen, $contenido, $ubicacion,$visitas, $palabras, $seccion);";
        echo $query;
        if (!($sentence = $conn->prepare($query)))
        {
            die("Multimedia Agregar: Fallo la preparacion del query".mysqli_error($conn));
        }

        if(!$sentence->execute()){
            die("Multimedia Agregar: Fallo la ejecucion del query".mysqli_error($conn));
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
    function estado($id, $estado){
        require './../dbconnect.php';
        $query = "call sp_cambiar_estado($id, '$estado');";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Estado: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Estado: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
        $conn->close();
    }
    function publicar($id){
        require './../dbconnect.php';
        $query = "call sp_publicar($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Multimedia Estado: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Multimedia Estado: Fallo la ejecucion del query");
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