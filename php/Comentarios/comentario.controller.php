<?php
    require './comentario.model.php';

    class ComentariosController{

        private $conn;

        private $getByArticleProcedure;
        private $getChildrenProcedure;

        private static $instance;

        //inyectar dependencia
        private function __construct($conn){

            if(!$conn){
                die("Asignar conexion a controlador")
            }

            $this->$conn =& $conn;

            $getByArticleProcedure = 'sp_comentarios_by_article';
        }

        public static function instance($conn = NULL){

            if(!self::$instance instanceof self){
                self::$instance = new self($conn);
            }

            return self::$instance;
        }

        //brute force solution
        function getByArticle($article_id){
            $format = 'call %s(%d)';

            $query = sprintf($format,
                $getByArticleProcedure,
                $article_id
            );

            if(!($sentence = $query->prepare($query))){
                die("PREPARATION FAILED");
            }

            if(!$sentence->execute()){
                die("EXECUTION FAILED");
            }

            if($result = $sentence->get_result()){
                //parent queries only
                $comments = array();
                while($row = $result->fetch_assoc()){
                    $comment = new Comentario();

                    $comment->$id         = $row["ID"];
                    $comment->$contenido  = $row["Contenido"];
                    $comment->$fecha      = $row["Fecha"];
                    $comment->$usuario    = $row["Usuario"];
                    $comment->$respuestas = $this->getChildrenComments($comment->$id);

                    array_push($comments, $comment);
                }

                echo json_encode($comments);
            }
        }

        //part of naive approach
        function getChildrenComments($comment_id){
            $format = 'call %s(%d)';

            $query = sprintf($format,
                $getChildrenProcedure,
                $comment_id
            );

            if(!($sentence = $query->prepare($query))){
                die("PREPARATION FAILED");
            }

            if(!$sentence->execute()){
                die("EXECUTION FAILED");
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

                return $replies;
            }
            return NULL;
        }
    }