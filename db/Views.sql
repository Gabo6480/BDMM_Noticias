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