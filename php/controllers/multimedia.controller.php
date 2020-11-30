<?php
    

class MultimediaController{

    //inyectar dependencia
    function __construct(){
        'sp_add_multimedia';
        'sp_eliminar_multimedia';
        'sp_multmedia_by_id';
        'sp_multimedia_by_article';
    }

    /////////////////
    // GET METHODS //
    /////////////////
    function getById($id){
        require './../dbconnect.php';
        $query = "call sp_multmedia_by_id($id);";

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
            if($row = $result->fetch_assoc()){
                header("Content-type: ".$row['Tipo']);
                echo $row['Contenido'];
                $result->free();
            }
        }
        $conn->close();
    }

    function getByArticleId($id){
        require './../dbconnect.php';
        $query = "cal sp_multimedia_by_article($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr, $row);
            }
            
            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }
    }
    //////////////////
    // POST METHODS //
    //////////////////
    function add($tipo, $contenido, $noticia){
        require './../dbconnect.php';
        $query = "call sp_add_multimedia('$tipo', '$contenido', $noticia);";

        if (!($sentence = $conn->prepare($query)))
        {
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
    }

    function remove($id){
        require './../dbconnect.php';
        $query = "call sp_eliminar_multimedia($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            die("Multimedia Agregar: Fallo la preparacion del query");
        }

        if(!$sentence->execute()){
            die("Multimedia Agregar: Fallo la ejecucion del query");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
    }
}