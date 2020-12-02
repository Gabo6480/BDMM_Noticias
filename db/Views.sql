CREATE VIEW v_Articulo_Pagina AS 
SELECT 
        N.ID, N.Estado, N.Titulo, N.Resumen, N.Contenido, N.Fecha, 
        N.Ubicacion, N.Visitas, N.Palabras, N.Escritor, N.Seccion,
        N.Prioridad, N.Foto, U.Nombre `NombreReportero`, U.Foto `FotoReportero`, S.Nombre `NombreSeccion`
    FROM noticia N INNER JOIN Usuario U 
    ON N.Escritor = U.ID
    INNER JOIN Seccion S
    ON N.Seccion = S.ID
    ORDER BY Prioridad DESC;
    
SELECT*FROM v_Articulo_Pagina