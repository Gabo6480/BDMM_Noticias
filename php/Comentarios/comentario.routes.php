<?php

    require '../dbconnect.php';
    require './comentario.controller.php';

    $article_id =  $_GET["article_id"];

    ComentariosController::instance($conn)->getByArticle($article_id);