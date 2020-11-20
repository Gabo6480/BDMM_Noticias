<?php

class Usuario{
    
    public $ID;
    public $Correo;
    public $Foto;
    public $Nombre;
    public $Contrasena;
    public $Rol;
    public $Activo

   /* function __construct(
        $ID,
        $Correo,
        $Foto,
        $Nombre,
        $Contrasena,
        $Rol,
        $Activo
    ){
        $this->$ID = $ID;
        $this->$Correo = $Correo;
        $this->$Foto = $Foto;
        $this->$Nombre = $Nombre;
        $this->$Contrasena = $Contrasena;
        $this->$Rol = $Rol;
        $this->$Activo=$Activo;
    }*/

    function toJson(){
        return json_encode(get_object_vars($this));
    }
}

?>