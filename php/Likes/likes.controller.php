<?php

require './likes.model.php';

//singleton
class LikesController{

    private static $instance;

    private $conn;
    private $addProcedure;
    private $removeProcedure;
    private $countProcedure;

    //Inyectar dependencia
    function __construct($conn){

        if($conn){
            $this->$conn =& $conn;

            $this->$addProcedure    ="sp_addLike"   ;
            $this->$removeProcedure ="sp_removeLike";
            $this->$countProcedure  ="sp_countLikes";
        }
    }

    public static function instance($conn = NULL){

        if(!self::$instance instanceof self){
            self::$instance = new self($conn);
        }

        return self::$instance;
    }

    function add($id_articulo,$id_usuario){
        $format = "call %s(%d,%d);";
        $query = sprintf($format,
            $addProcedure,
            $id_articulo,
            $id_usuario
        );

        if (!($sentence = $conn->prepare()))
        {
            echo "COUNT PREPARATION FAILED";
        }

        if(!$sentence->execute()){
            echo "QUERY EXECUTION FAILED";
        }
    }

    function remove($id_articulo,$id_usuario){
        $format = "call %s(%d,%d);";
        $query = sprintf($format,
            $removeProcedure,
            $id_articulo,
            $id_usuario
        );

        if (!($sentence = $conn->prepare()))
        {
            echo "COUNT PREPARATION FAILED";
        }

        if(!$sentence->execute()){
            echo "QUERY EXECUTION FAILED";
        }
    }

    function count($id_articulo){
        
        $format = "call %s(%d);";

        $query = sprintf($format,
            $countProcedure,
            $id_articulo
        );

        if (!($sentence = $conn->prepare()))
        {
            echo "COUNT PREPARATION FAILED";
        }

        if(!$sentence->execute()){
            echo "QUERY EXECUTION FAILED";
        }
        else{
            if($result = $sentence->get_result()){
                echo $result->num_rows;
            }else{
                echo -1;
            }
        }
    }
}

?>