<?php

    class Comentario{
        public $id;
        public $contenido;
        public $fecha;
        public $noticia;
        public $usuario;
        public $respuestas = array();
    }

    class Respuesta{
        public $id;
        public $contenido;
        public $fecha;
        public $noticia;
        public $usuario;
    }