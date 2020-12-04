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

CREATE PROCEDURE sp_get_usuarios_similares_activos
(   
    IN pNombre TINYTEXT,
    IN pRol ENUM('usuario', 'reportero', 'editor')
)
BEGIN 
    SELECT ID, Correo, Foto, Nombre, Telefono, Contrasena, Rol, Activo
    FROM v_Usuarios_Activos U
    WHERE Nombre LIKE CONCAT('%',pNombre,'%') AND Rol = COALESCE(pRol, Rol);
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
    FROM v_Usuarios_Activos U
    WHERE U.Rol = rol;
END //

CREATE  PROCEDURE sp_get_avatar
(IN pID int)
BEGIN
    SELECT Foto `avatar`
    FROM v_Usuarios_Activos
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
        Correo     =  COALESCE(pCorreo		,Correo		),
        Foto       =  COALESCE(pFoto       	,Foto      	),
        Nombre     =  COALESCE(pNombre     	,Nombre    	),
        Telefono   =  COALESCE(pTelefono   	,Telefono  	),
        Contrasena =  COALESCE(pContra	  	,Contrasena	),
        Rol        =  COALESCE(pRol        	,Rol       	),
        Activo     =  COALESCE(pActivo    	,Activo    	)
    WHERE pID = ID;
END //

CREATE PROCEDURE sp_usuarios_baja
(IN pID INT)
BEGIN
    UPDATE Usuario
    SET Activo = 0
    WHERE ID = pID;
END //

CREATE PROCEDURE sp_login
(
    IN pCorreo varchar(30),
    IN pContra TINYTEXT
 )
BEGIN
    SELECT ID, Nombre, Correo, Contrasena 
    FROM v_Usuarios_Activos 
    WHERE Correo = pCorreo AND Contrasena = pContra;
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

CREATE PROCEDURE sp_seccionById(IN pID INT)
BEGIN
	SELECT ID,Nombre,Color,Activa,Orden
    FROM seccion
    WHERE ID = pID;
END//

CREATE PROCEDURE sp_getSeccionesActivas()
BEGIN
    SELECT ID,Nombre,Color,Activa,Orden
    FROM seccion
    WHERE Activa = 1
    ORDER BY Orden DESC;
END //

CREATE PROCEDURE sp_search_secciones
(IN pNombre TINYTEXT)
BEGIN
	SELECT ID,Nombre,Color,Activa,Orden
    FROM seccion
    WHERE Activa = 1 AND Nombre LIKE CONCAT('%', pNombre, '%')
    ORDER BY Orden DESC;
END //

CREATE PROCEDURE sp_seccion_orden_aumentar(IN pID INT)
BEGIN 
	UPDATE seccion
    SET Orden = Orden +1
    WHERE ID = pID;
END //

CREATE PROCEDURE sp_seccion_orden_disminuir(IN pID INT)
BEGIN 
	UPDATE seccion
    SET Orden = Orden -1
    WHERE ID = pID;
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
		INSERT INTO noticia(Estado, Titulo, Resumen,Contenido,Fecha, Ubicacion,Palabras,Escritor,Seccion)
		VALUES (pEstado, pTitulo, pResumen,pContenido,pFecha, pUbicacion,pPalabras,pEscritor,pSeccion);

        SELECT 'SUCCESS' `STATUS`, MAX(ID) `id` FROM noticia;
END //

CREATE PROCEDURE sp_editar_noticia
(
 IN pID INT,
 IN pEstado ENUM('en redaccion','terminada','publicada'),
 IN pTitulo    TINYTEXT,
 IN pFoto 	   INT,
 IN pResumen   TINYTEXT,
 IN pContenido TEXT,
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
			Foto = pFoto, Resumen = pResumen,
			Contenido = pContenido, Ubicacion = pUbicacion,
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

CREATE PROCEDURE sp_cambiar_estado(IN pID INT, IN pEstado ENUM('en redaccion','terminada','publicada'))
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
        START TRANSACTION;
            UPDATE noticia
            SET Estado = pEstado
            WHERE ID = pID;
            
    IF `_rollback` THEN
        SELECT 'FAILURE' `STATUS`;
        ROLLBACK;
    ELSE
        SELECT 'SUCCESS' `STATUS`;
        COMMIT;
    END IF;
END //

CREATE PROCEDURE sp_publicar(IN pID INT)
BEGIN
	UPDATE noticia
	SET Estado = 'publicada',
	Contenido = REEMPLAZAR_COMENTARIOS(Contenido),
    Fecha = NOW()
	WHERE ID = pID;
    
    IF EXISTS(SELECT ID FROM noticia WHERE ID = pID AND Foto IS NOT NULL) THEN
		SELECT 'SUCCESS' `STATUS`;
	ELSE
		 SELECT 'FAILURE' `STATUS`,'SE TIENE QUE SUBIR UNA IMAGEN/VIDEO PRINCIPAL PARA PUBLICAR NOTICIA' `MESSAGE`;
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
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Prioridad, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE Seccion = pID
    ORDER BY Prioridad DESC;
END //

CREATE PROCEDURE sp_noticia_by_reportero
(IN pID INT)
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Prioridad, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE Escritor = pID
    ORDER BY Prioridad DESC;
END //

CREATE PROCEDURE sp_noticia_by_id
(IN pID INT)
BEGIN 
	
    UPDATE v_Articulo_Pagina
    SET Visitas = Visitas + 1
    WHERE ID = pID;

    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE ID = pID;
END //

CREATE PROCEDURE sp_noticia_get()
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Prioridad, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    ORDER BY Prioridad DESC;
END //

CREATE PROCEDURE sp_noticia_get_estado
(IN pEstado ENUM('en redaccion', 'terminada', 'publicada'))
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE Estado = pEstado;
END //

CREATE PROCEDURE sp_noticia_get_estado_reportero
(IN pEstado ENUM('en redaccion', 'terminada', 'publicada'),
 IN pEscritor INT)
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE Estado = pEstado and Escritor = pEscritor;
END //

CREATE PROCEDURE sp_noticia_get_estado_seccion
(IN pEstado ENUM('en redaccion', 'terminada', 'publicada'),
 IN pSeccion INT)
BEGIN 
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE Estado = pEstado and Seccion = pSeccion;
END //

CREATE PROCEDURE sp_get_similar
(IN pPalabras TEXT)
BEGIN
    DECLARE m_regex TEXT DEFAULT ('');
    
	SET m_regex = REGEX_FROM_CSV(pPalabras);
		
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE Estado = 'publicada' AND  LOWER(Palabras) RLIKE LOWER(m_regex);
END//

CREATE PROCEDURE sp_get_similar_distintos_a
(IN pID INT,IN pPalabras TEXT)
BEGIN
    DECLARE m_regex TEXT DEFAULT ('');
    
	SET m_regex = REGEX_FROM_CSV(pPalabras);
		
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE Estado = 'publicada' AND  LOWER(Palabras) RLIKE LOWER(m_regex) AND pID <> ID;
END//

CREATE PROCEDURE sp_get_similar_distintos_a_sl
(IN pID INT,IN pPalabras TEXT)
BEGIN
    DECLARE m_regex TEXT DEFAULT ('');
    
	SET m_regex = REGEX_FROM_CSV(pPalabras);
		
    SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default
    WHERE LOWER(Palabras) RLIKE LOWER(m_regex) AND pID <> ID;
END//

CREATE PROCEDURE sp_get_nombre_similar(IN pTitulo TINYTEXT, IN pReportero INT, IN pSeccion INT, IN pEstado ENUM('en redaccion', 'terminada', 'publicada'))
BEGIN
	SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default 
    WHERE Titulo LIKE CONCAT('%', pTitulo ,'%') AND Seccion = COALESCE(pSeccion, Seccion) AND Estado = COALESCE(pEstado,Estado) AND Escritor = COALESCE(pReportero, Escritor);
END//

CREATE PROCEDURE sp_getPopular()
BEGIN
	SELECT ID, Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Visitas, Palabras, Escritor, Seccion, Foto, `NombreReportero`, `NombreSeccion`
    FROM v_Articulo_Imagen_Default 
    WHERE Estado = 'publicada'
    ORDER BY Visitas DESC;
END //

#####################
#     multimedia    #
#####################
CREATE PROCEDURE sp_add_multimedia
(IN pTipo VARCHAR(30), IN pContenido MEDIUMBLOB)
BEGIN
	INSERT INTO multimedia(Tipo, Contenido)
	VALUES(pTipo, pContenido);
    
	SELECT MAX(ID) `id` FROM Multimedia;
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
    SELECT "NO SOPORTADO EN ESTA VERSION";
END //

#####################
#    comentarios    #
#####################
CREATE PROCEDURE sp_comentarios_by_article
(IN pID INT)
BEGIN
    SELECT ID, Contenido, Fecha, Padre, Noticia, Usuario, Nombre, Foto
    FROM v_Comentarios_Articulos
    WHERE Noticia = pID AND Padre is NULL;
END //

CREATE PROCEDURE sp_comentarios_respuestas
(IN pID INT)
BEGIN
    SELECT ID, Contenido, Fecha, Padre, Noticia, Usuario, Nombre, Foto
	FROM v_Comentarios_Articulos
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
CREATE PROCEDURE sp_addLike(IN pNoticia INT, IN pUsuario INT)
BEGIN
    INSERT INTO me_gusta(Noticia, Usuario) VALUES(pNoticia, pUsuario); 
END //

CREATE PROCEDURE sp_removeLike(IN pNoticia INT, IN pUsuario INT)
BEGIN
    DELETE FROM me_gusta
    WHERE Noticia = pNoticia AND Usuario = pUsuario;
END //

CREATE PROCEDURE sp_countLikes(IN pNoticia INT)
BEGIN
    SELECT LIKE_COUNT(pNoticia) `RESULT`;
END //

CREATE PROCEDURE sp_comprobarLike( IN pNoticia INT, IN pUsuario INT)
BEGIN 
	IF EXISTS(SELECT ID FROM me_gusta WHERE Noticia = pNoticia AND Usuario = pUsuario) THEN
		SELECT "EXISTS" `RESULT`;
	ELSE
		SELECT "NOT" `RESULT`;
	END IF;
END //

DELIMITER ;