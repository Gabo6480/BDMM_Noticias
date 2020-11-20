<?php

class Like{
    
    public $Id;
    public $Noticia;
    public $Usuario;

    function __construct($Id, $Noticia,$Usuario){
        $this->$Id = $Id;
        $this->$Noticia = $Noticia;
        $this->$Usuario = $Usuario;
    }

    function toJson(){
        return json_encode(get_object_vars($this));
    }
}

?>