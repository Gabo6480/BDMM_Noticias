<?php
    require './../models/comentario.model.php';

    class ComentariosController{

        //inyectar dependencia
        function __construct(){
            'sp_comentarios_by_article';
            'sp_comentarios_respuestas';

            'sp_comentarios_crear'     ;
            'sp_comentarios_editar'    ;
            'sp_comentarios_eliminar'  ;
        }

        /////////////////
        // GET METHODS //
        /////////////////
        //brute force solution
        function getByArticle($article_id){
            require './../dbconnect.php';
            $query = "call sp_comentarios_by_article($article_id);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die("Comentarios By Article: PREPARATION FAILED");
            }

            if(!$sentence->execute()){
                die("Comentarios By Article: EXECUTION FAILED".mysqli_error($conn));
            }

            if($result = $sentence->get_result()){
                //parent queries only
                $comments = array();
                while($row = $result->fetch_assoc()){
                    $comment = new Comentario();

                    $comment->id         = $row["ID"];
                    $comment->contenido  = $row["Contenido"];
                    $comment->fecha      = $row["Fecha"];
                    $comment->usuario    = $row["Usuario"];
                    $comment->respuestas = $this->getChildrenComments($comment->id);

                    array_push($comments, $comment);
                }

                header("Content-type:application/json");
                echo json_encode($comments);
                $result->free();
            }
            $conn->close();
        }
        //part of naive approach
        function getChildrenComments($comment_id){
            require './../dbconnect.php';
            $query = "call sp_comentarios_respuestas($comment_id)";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die("Children Comments: PREPARATION FAILED");
            }

            if(!$sentence->execute()){
                $conn->close();
                die("Children Comments: EXECUTION FAILED");
            }

            if($result = $sentence->get_result()){
                //children comments
                $replies = array();
                while($row = $result->fetch_assoc()){
                    $reply = new Respuesta();

                    $reply->$id = $row["ID"];
                    $reply->$contenido = $row["Contenido"];
                    $reply->$fecha = $row["Fecha"];
                    $reply->$usuario = $row["Usuario"];

                    array_push($replies,$reply);
                }
                $conn->close();
                $result->free();
                return $replies;
            }else{
                $conn->close();
                return NULL;
            }
           
        }
        //////////////////
        // POST METHODS //
        //////////////////
        function add($contenido, $padre, $noticia, $usuario){
            require './../dbconnect.php';
            $query = "call sp_comentarios_crear('$contenido',$padre,$noticia,$usuario);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die("Create Comment: Preparation Failed");
            }

            if(!$sentence->execute()){
                $conn->close();
                die("Create Comment: Execution Failed");
            }

            if($result = $sentence->get_result()){
                $row = $result->fetch_assoc();
                header("Content-type:application/json");
                echo json_encode($row);
                $result->free();
            }
            $conn->close();
        }
        function edit($id, $contenido){
            require './../dbconnect.php';
            $query = "call sp_comentarios_editar($id,'$contenido',$padre,$noticia,$usuario);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die("Edit Comment: Preparation Failed");
            }

            if(!$sentence->execute()){
                $conn->close();
                die("Edit Comment: Execution Failed");
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
            $query = "call sp_comentarios_eliminar($id);";

            if(!($sentence = $conn->prepare($query))){
                $conn->close();
                die("Delete Comment: Preparation Failed");
            }

            if(!$sentence->execute()){
                $conn->close();
                die("Delete Comment: Execution Failed");
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

    
//faster getByArticle conn USA UN CHORRO DE MEMORIA
/*function getByArticleFast($article_id){

    die("getByArticleFast: NOT YET IMPLEMENTED");

    $format = 'call $getAllByArticleProcedure($article_id);';

    if(!($sentence = $this->$conn->prepare($query))){
        die("PREPARATION FAILED");
    }

    if(!$sentence->execute()){
        die("EXECUTION FAILED");
    }

    if($result = $sentence->get_result()){

        $id_object_map = array();
        $rowArr = array();
        $j = 0;
        while($row = $result->fetch_assoc()){
            array_push($rowArr, $row);
            $id_object_map[$row["ID"]] = $j;
            $j++;
        }

        //usar associative array como hash map

        $aux_map = array();
        for($i = 0; $i < count($rowArr); $i++){
            if($id = $rowArr[$i]["Padre"]){
                if(!$aux_map[$id]){
                    $aux_map[$id] = array();
                }
                array_push($aux_map[$id], $rowArr[$i]);
            }
        }
    }

}*/