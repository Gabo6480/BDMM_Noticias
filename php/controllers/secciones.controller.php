<?php

class SeccionesController{

    //Inyectar dependencia
    function __construct(){
        'sp_addSeccion'   ;
        'sp_editSeccion'  ;
        'sp_removeSeccion';
        
        'sp_getSecciones' ;
        'sp_getSeccionesActivas';
    }

    //////////////////
    // POST METHODS //
    //////////////////
    function add($nombre,$color,$orden){
        require './../dbconnect.php';
        $query = "call sp_addSeccion('$nombre','$color',$orden);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("COUNT PREPARATION FAILED");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("QUERY EXECUTION FAILED");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
        $conn->close();
    }
    function edit($id,$nombre,$color,$orden){
        require './../dbconnect.php';
        $query = "call sp_editSeccion($id,'$nombre','$color',$orden);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("COUNT PREPARATION FAILED");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("QUERY EXECUTION FAILED");
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
        $query = "call sp_removeSeccion($id);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("COUNT PREPARATION FAILED");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("QUERY EXECUTION FAILED");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
        $conn->close();
    }

    /////////////////
    // GET METHODS //
    /////////////////
    function get(){
        require './../dbconnect.php';
        $query = "call sp_getSecciones();";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("COUNT PREPARATION FAILED");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("QUERY EXECUTION FAILED");
        }

        
        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr, $row);
            }
            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }else{
            echo 0;
        }
        $conn->close();
    }
    function getActivas(){
        require './../dbconnect.php';
        $query = "call sp_getSeccionesActivas();";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("COUNT PREPARATION FAILED");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("QUERY EXECUTION FAILED");
        }

        
        if($result = $sentence->get_result()){
            $arr = array();
            while($row = $result->fetch_assoc()){
                array_push($arr, $row);
            }
            header("Content-type:application/json");
            echo json_encode($arr);
            $result->free();
        }else{
            echo 0;
        }
        $conn->close();
    }
}