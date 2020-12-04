use BDMM_DB;

CREATE VIEW v_Articulo_Pagina AS 
SELECT 
        N.ID, N.Estado, N.Titulo, N.Resumen, N.Contenido, N.Fecha, 
        N.Ubicacion, N.Visitas, N.Palabras, N.Escritor, N.Seccion,
        N.Prioridad, N.Foto, U.Nombre `NombreReportero`,  S.Nombre `NombreSeccion`
    FROM noticia N INNER JOIN Usuario U 
    ON N.Escritor = U.ID
    INNER JOIN Seccion S
    ON N.Seccion = S.ID
    ORDER BY Prioridad DESC;
    
CREATE VIEW v_Usuarios_Activos AS
SELECT ID, Correo, Foto, Nombre, Telefono, Contrasena, Rol, Activo
    FROM  Usuario
    WHERE Activo = 1;
    
CREATE VIEW v_Comentarios_Articulos AS
 SELECT C.ID, Contenido, Fecha, Padre, Noticia, Usuario, U.Nombre, U.Foto
    FROM comentario C INNER JOIN  usuario U ON U.ID = C.Usuario;
    
CREATE VIEW v_Articulo_Imagen_Default AS 
SELECT 
	ID, Estado, Titulo, Resumen, Contenido, Fecha, 
	Ubicacion, Visitas, Palabras, Escritor, Seccion,
	Prioridad, IF(ISNULL(Foto), FIRST_NON_NULL_IMAGE(), Foto) `Foto`, `NombreReportero`,  `NombreSeccion`
FROM v_Articulo_Pagina
ORDER BY Prioridad DESC;

SELECT * FROM v_Articulo_Imagen_Default;