use BDMM_DB;

DELIMITER //
#SECCION
CREATE TRIGGER tr_BorrarPostsSeccion 
AFTER UPDATE 
ON seccion
FOR EACH ROW
BEGIN
    IF new.Activa = 0 THEN
        DELETE FROM Noticia
        WHERE Seccion = new.ID AND Estado <> 'publicada';
    END IF;
END //

#Si se da de baja logica reportero
CREATE TRIGGER tr_BorrarPostsReportero 
AFTER UPDATE 
ON usuario
FOR EACH ROW
BEGIN
    IF new.Activo = 0 THEN
        DELETE FROM Noticia
        WHERE Escritor = new.ID AND Estado <> 'publicada';
    END IF;
END //

CREATE TRIGGER tr_BorrarComentariosAlPublicar
AFTER UPDATE
ON noticia 
FOR EACH ROW
BEGIN 
	IF new.Estado = 'publicada' AND (new.Estado <> old.Estado) THEN
		UPDATE noticia 
        SET Contenido = REEMPLAZAR_COMENTARIOS(Contenido)
        WHERE ID = new.ID;
    END IF;
END //

DELIMITER ;