DELIMITER //

#usuarios
CREATE PROCEDURE sp_get_usuarios()
BEGIN 
    SELECT Correo, Foto, Nombre, Rol, Activo
    FROM  Usuario;
END //

CREATE PROCEDURE sp_get_one_usuarios
(IN id INT)
BEGIN
    SELECT Correo, Foto, Nombre, Contraseña, Rol, Activo 
    FROM Usuario U
    WHERE U.ID = id;
END //

CREATE PROCEDURE sp_get_usuarios_rol
(IN rol ENUM('en redaccion', 'terminada', 'publicada'))
BEGIN
    SELECT Correo, Foto, Nombre, Rol, Activo
    FROM Usuario U
    WHERE U.Rol = rol;
END //

CREATE PROCEDURE sp_usuarios_crear
(
    IN correo VARCHAR(30),
    IN foto BLOB,
    IN nombre TINYTEXT,
    IN contra TINYTEXT,
    IN rol ENUM('usuario', 'reportero', 'editor',
    IN activo BOOL
)
BEGIN
    INSERT INTO Usuario(Correo, Foto, Nombre, Contraseña, Rol, Activo)
    VALUES(correo, foto, nombre, contra, rol, activo);
END //

CREATE PROCEDURE sp_usuarios_editar
(
    IN id INT,
    IN correo VARCHAR(30),
    IN foto BLOB,
    IN nombre TINYTEXT,
    IN contra TINYTEXT,
    IN rol ENUM('usuario', 'reportero', 'editor'),
    IN activo BOOL
)
BEGIN
    UPDATE usuario
    SET 
        usuario.Correo = correo,
        usuario.Foto = foto,   
        usuario.Nombre = nombre,   
        usuario.Contraseña = contra,   
        usuario.Rol = rol,   
        usuario.Activo = activo,   
    WHERE id = usuario.ID;
END

CREATE PROCEDURE sp_usuarios_baja
(IN id INT)
BEGIN
    UPDATE Usuario
    SET Activo = false
    WHERE id = usuario.ID;
END //

CREATE PROCEDURE sp_login
(
    IN correo varchar(30),
    IN contra varchar TINYTEXT
 )
BEGIN
    IF EXISTS( SELECT ID FROM usuario u WHERE correo = u.Correo and contra = u.Contraseña)
    THEN
    BEGIN
        SELECT('SUCCESS');
    END
END //

CREATE PROCEDURE sp_usuarios_eliminar
(
    IN id INT 
)
BEGIN
    DELETE FROM usuario
    WHERE usuario.ID = id;
END //

#Noticias

DELIMITER ;