<?php

class Usuario{
    
    public $ID;
    public $Correo;
    public $Foto;
    public $Nombre;
    public $Contrasena;
    public $Rol;
    public $Activo;

    function toJson(){
        return json_encode(get_object_vars($this));
    }
}

?>