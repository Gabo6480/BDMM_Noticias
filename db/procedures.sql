USE BDMM_DB;
#####################
#      usuarios     #
#####################
DELIMITER //
CREATE PROCEDURE sp_get_usuarios()
BEGIN 
    SELECT ID, Correo, Foto, Nombre, Telefono Contrasena, Rol, Activo
    FROM  Usuario;
END //

CREATE PROCEDURE sp_get_usuarios_activos()
BEGIN
    SELECT ID, Correo, Foto, Nombre, Telefono, Contrasena, Rol, Activo
    FROM  Usuario
    WHERE Activo = 1;
END //

CREATE PROCEDURE sp_get_one_usuarios
(IN id INT)
BEGIN
    SELECT ID, Correo, Foto, Nombre, Telefono, Contrasena, Rol, Activo
    FROM Usuario U
    WHERE U.ID = id;
END //

#Agregar a controlador
CREATE PROCEDURE sp_get_usuarios_similares_activos
(IN pNombre TINYTEXT)
BEGIN 
    SELECT ID, Correo, Foto, Nombre, Telefono, Contraseña, Rol, Activo
    FROM Usuario U
    WHERE Activo = 1 AND Nombre LIKE CONCAT('%',pNombre,'%');
END //

#Agregar a controlador
CREATE PROCEDURE sp_get_usuarios_similares_activos_rol
(   
    IN pNombre TINYTEXT,
    IN pRol ENUM('usuario', 'reportero', 'editor')
)
BEGIN 
    SELECT ID, Correo, Foto, Nombre, Telefono, Contraseña, Rol, Activo
    FROM Usuario U
    WHERE Activo = 1 AND Nombre LIKE CONCAT('%',pNombre,'%') AND Rol = pRol;
END //

CREATE  PROCEDURE sp_get_usuarios_rol
(IN rol ENUM('usuario', 'reportero', 'editor'))
BEGIN
    SELECT ID, Correo, Foto, Nombre, Telefono, Contrasena, Rol, Activo
    FROM Usuario U
    WHERE U.Rol = rol;
END //

CREATE  PROCEDURE sp_get_usuarios_rol_activos
(IN rol ENUM('usuario', 'reportero', 'editor'))
BEGIN
    SELECT ID, Correo, Foto, Nombre, Telefono, Contrasena, Rol, Activo
    FROM Usuario U
    WHERE U.Rol = rol AND Activo = 1;
END //

CREATE  PROCEDURE sp_get_avatar
(IN pID int)
BEGIN
    SELECT Foto `avatar`
    FROM Usuario
    WHERE ID = pID;
END //

CREATE PROCEDURE sp_usuarios_crear
(
    IN pCorreo VARCHAR(30),
    IN pFoto MEDIUMBLOB,
    IN pNombre TINYTEXT,
    IN pTelefono VARCHAR(12),
    IN pContra TINYTEXT,
    IN pRol ENUM('usuario', 'reportero', 'editor'),
    IN pActivo BOOL
)
BEGIN
    INSERT INTO Usuario(Correo, Foto, Nombre, Telefono, Contrasena, Rol, Activo)
    VALUES(pCorreo, pFoto, pNombre, pTelefono, pContra, pRol, pActivo);
END //

CREATE PROCEDURE sp_usuarios_editar
(
    IN pID       INT,
    IN pCorreo   VARCHAR(30),
    IN pFoto     MEDIUMBLOB,
    IN pNombre   TINYTEXT,
    IN pTelefono VARCHAR(12),
    IN pContra   TINYTEXT,
    IN pRol      ENUM('usuario', 'reportero', 'editor'),
    IN pActivo   BOOL
)
BEGIN
    UPDATE usuario
    SET 
        Correo     =  pCorreo     ,
        Foto       =  pFoto       ,   
        Nombre     =  pNombre     ,   
        Telefono   =  pTelefono   ,
        Contrasena =  pContra	  ,   
        Rol        =  pRol        ,   
        Activo     =  pActivo    
    WHERE pID = ID;
END //

CREATE PROCEDURE sp_usuarios_baja
(IN id INT)
BEGIN
    UPDATE Usuario
    SET Activo = 0
    WHERE id = usuario.ID;
END //

CREATE PROCEDURE sp_login
(
    IN pCorreo varchar(30),
    IN pContra TINYTEXT
 )
BEGIN
    SELECT ID, Nombre, Correo, Contrasena FROM Usuario WHERE Correo = pCorreo AND Contrasena = pContra;
END //

CREATE PROCEDURE sp_usuarios_eliminar
(
    IN pID INT 
)
BEGIN
    UPDATE usuario
    SET Activo = 0
    WHERE ID = pID;
END //

#####################
#      seccion      #
#####################

CREATE PROCEDURE sp_addSeccion
(IN pNombre TINYTEXT, IN pColor VARCHAR(6), IN pOrden INT)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            INSERT INTO seccion(Nombre, Color, Orden)
            VALUES (pNombre,pColor,pOrden);
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_editSeccion
(IN pID INT, IN pNombre TINYTEXT, IN pColor VARCHAR(6), IN pOrden INT)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            UPDATE seccion
            set Nombre = pNombre, Color = pColor, Orden = pOrden 
            WHERE ID = pID;
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_removeSeccion
(IN pID INT)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            UPDATE seccion
            SET Activa = 0
            WHERE ID = pID;
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_getSecciones()
BEGIN
    SELECT ID,Nombre,Color,Activa,Orden
    FROM seccion
    ORDER BY Orden DESC;
END //

CREATE PROCEDURE sp_getSeccionesActivas()
BEGIN
    SELECT ID,Nombre,Color,Activa,Orden
    FROM seccion
    WHERE Activa = 1
    ORDER BY Orden DESC;
END //

#####################
#     noticias      #
#####################

CREATE PROCEDURE sp_add_noticia
(
 IN pEstado ENUM('en redaccion','terminada','publicada'),
 IN pTitulo    TINYTEXT,
 IN pResumen   TINYTEXT,
 IN pContenido TEXT,
 IN pFecha     DATETIME,
 IN pUbicacion TINYTEXT,
 IN pPalabras  TEXT,
 IN pEscritor  INT,
 IN pSeccion   INT 
)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            INSERT INTO noticia(Estado, Titulo, Resumen,Contenido,Fecha, Ubicacion,Palabras,Escritor,Seccion)
            VALUES (pEstado, pTitulo, pResumen,pContenido,pFecha, pUbicacion,pPalabras,pEscritor,pSeccion);
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_editar_noticia
(
 IN pID INT,
 IN pEstado ENUM('en redaccion','terminada','publicada'),
 IN pTitulo    TINYTEXT,
 IN pResumen   TINYTEXT,
 IN pContenido TEXT,
 IN pFecha     DATETIME,
 IN pUbicacion TINYTEXT,
 IN pVisitas   INT,
 IN pPalabras  TEXT,
 IN pSeccion   INT 
)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            UPDATE noticia
            SET Estado = pEstado, Titulo = pTitulo,
            Resumen = pResumen, Contenido = pContenido,
            Fecha = pFecha, Ubicacion = pUbicacion,
            Visitas = pVisitas, Palabras = pPalabras, Seccion = pSeccion
            WHERE ID = pID;
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_eliminar_noticia
(
 IN pID INT
)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            DELETE FROM Noticia
            WHERE ID = pID;
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_noticia_by_seccion
(IN pID INT)
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Prioridad, Foto
    FROM noticia
    WHERE Seccion = pID
    ORDER BY Prioridad DESC;
END //

CREATE PROCEDURE sp_noticia_by_reportero
(IN pID INT)
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Prioridad, Foto
    FROM noticia
    WHERE Escritor = pID
    ORDER BY Prioridad DESC;
END //

CREATE PROCEDURE sp_noticia_by_id
(IN pID INT)
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto
    FROM noticia
    WHERE ID = pID;
END //

CREATE PROCEDURE sp_noticia_get()
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Prioridad, Foto
    FROM noticia
    ORDER BY Prioridad DESC;
END //

CREATE PROCEDURE sp_noticia_get_estado
(IN pEstado ENUM('en redaccion', 'terminada', 'publicada'))
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto
    FROM noticia
    WHERE Estado = pEstado;
END //

CREATE PROCEDURE sp_noticia_get_estado_reportero
(IN pEstado ENUM('en redaccion', 'terminada', 'publicada'),
 IN pEscritor INT)
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto
    FROM noticia
    WHERE Estado = pEstado and Escritor = pEscritor;
END //

CREATE PROCEDURE sp_noticia_get_estado_seccion
(IN pEstado ENUM('en redaccion', 'terminada', 'publicada'),
 IN pSeccion INT)
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto
    FROM noticia
    WHERE Estado = pEstado and Seccion = pSeccion;
END //

#agregar a controller
CREATE PROCEDURE sp_get_similar
(IN pPalabras TEXT)
BEGIN
    DECLARE m_regex TEXT DEFAULT ('');
    
	SET m_regex = REGEX_FROM_CSV(pPalabras);
		
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto
    FROM noticia
    WHERE Estado = 'publicada' AND  LOWER(Palabras) RLIKE LOWER(m_regex);
END//

#agregar a controller
CREATE PROCEDURE sp_get_similar_distintos_a
(IN pID INT,IN pPalabras TEXT)
BEGIN
    DECLARE m_regex TEXT DEFAULT ('');
    
	SET m_regex = REGEX_FROM_CSV(pPalabras);
		
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto
    FROM noticia
    WHERE Estado = 'publicada' AND  LOWER(Palabras) RLIKE LOWER(m_regex) AND pID <> ID;
END//

#agregar a controller
CREATE PROCEDURE sp_get_nombre_similar(IN pTitulo TINYTEXT)
BEGIN
	SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto
    FROM Noticia 
    WHERE Titulo LIKE CONCAT('%', pTitulo ,'%');
END//

#agregar a controller
CREATE PROCEDURE sp_get_nombre_similar_seccion(IN pTitulo TINYTEXT, IN pSeccion INT)
BEGIN
SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto
    FROM Noticia 
    WHERE Seccion = pSeccion and Titulo LIKE CONCAT('%', pTitulo ,'%');
END//

#####################
#     multimedia    #
#####################
CREATE PROCEDURE sp_add_multimedia
(IN pTipo VARCHAR(30), IN pContenido MEDIUMBLOB, IN pNoticia INT)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            INSERT INTO multimedia(Tipo, Contenido, Noticia)
            VALUES(pTipo, pContenido, pNoticia);
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_eliminar_multimedia
(IN pID INT)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            DELETE FROM multimedia WHERE ID = pID;
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_multmedia_by_id
(IN pID INT)
BEGIN
    SELECT Tipo, Contenido FROM multimedia WHERE ID = pID;
END //

CREATE PROCEDURE sp_multimedia_by_article
(IN pNoticia INT)
BEGIN
    SELECT ID, Tipo, Contenido FROM multimedia WHERE Noticia = pNoticia;
END //

#####################
#    comentarios    #
#####################

CREATE PROCEDURE sp_comentarios_by_article
(IN pID INT)
BEGIN
    SELECT ID, Contenido, Fecha, Padre, Noticia, Usuario
    WHERE Noticia = pID AND Padre = NULL
    ORDER BY Fecha ASC;
END //

CREATE PROCEDURE sp_comentarios_respuestas
(IN pID INT)
BEGIN
    SELECT ID, Contenido, Fecha, Padre, Noticia, Usuario
    WHERE Padre = pID
    ORDER BY Fecha ASC;
END //

CREATE PROCEDURE sp_comentarios_crear
(IN pContenido Text, IN pPadre INT, IN pNoticia INT, IN pUsuario INT)
BEGIN
    INSERT INTO comentario(Contenido, Padre, Noticia, Usuario)
    VALUES(pContenido, pPadre, pNoticia, pUsuario);
END //

CREATE PROCEDURE sp_comentarios_editar
(IN pID INT, IN pContenido Text)
BEGIN
    UPDATE comentario
    SET Contenido = pContenido
    WHERE ID = pID;
END //

CREATE PROCEDURE sp_comentarios_eliminar
(IN pID INT)
BEGIN
    DELETE FROM comentario 
    WHERE ID = pID;
END //


#####################
#      me_gusta     #
#####################

CREATE PROCEDURE sp_addLike(IN pArticulo INT, IN pUsuario INT)
BEGIN
    INSERT INTO me_gusta(Noticia, Usuario) VALUES(pArticulo, pUsuario); 
END //

CREATE PROCEDURE sp_removeLike(IN pArticulo INT, IN pUsuario INT)
BEGIN
    DELETE FROM me_gusta
    WHERE Articulo = pArticulo AND Usuario = pUsuario;
END //

CREATE PROCEDURE sp_countLikes(IN pArticulo INT)
BEGIN
    SELECT ID from me_gusta
    WHERE Articulo = pArticulo;
END //

DELIMITER ;