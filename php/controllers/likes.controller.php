<?php

require './../models/likes.model.php';

class LikesController{

    //Inyectar dependencia
    function __construct(){
        'sp_addLike'   ;
        'sp_removeLike';
        'sp_countLikes';
    }

    //////////////////
    // POST METHODS //
    //////////////////
    function add($id_articulo,$id_usuario){
        require './../dbconnect.php';
        $query = "call sp_addLike($id_articulo,$id_usuario);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Add Like: COUNT PREPARATION FAILED");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Add Like: QUERY EXECUTION FAILED");
        }

        if($result = $sentence->get_result()){
            $row = $result->fetch_assoc();

            header("Content-type:application/json");
            echo json_encode($row);
            $result->free();
        }
        $conn->close();
    }

    function remove($id_articulo,$id_usuario){
        require './../dbconnect.php';
        $query = "call sp_removeLike($id_articulo,$id_usuario);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("Remove Likes: PREPARATION FAILED");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("Remove Likes: EXECUTION FAILED");
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
    function count($id_articulo){
        require './../dbconnect.php';
        $query = "call sp_countLikes($id_articulo);";

        if (!($sentence = $conn->prepare($query)))
        {
            $conn->close();
            die("COUNT PREPARATION FAILED");
        }

        if(!$sentence->execute()){
            $conn->close();
            die("QUERY EXECUTION FAILED");
        }

        header("Content-type:text/plain");
        if($result = $sentence->get_result()){
            echo $result->num_rows;
            $result->free();
        }else{
            echo 0;
        }
        $conn->close();
    }
}