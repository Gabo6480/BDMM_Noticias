USE BDMM_DB;

#Insertar usuarios
INSERT INTO USUARIO (Correo, Foto, Nombre, Telefono, Contrasena, Rol)
VALUES(
'aaa@aaa.com',
'data:image/png;base64,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',
'Alejandro Mojica', 
'5555555555', 
'123', 
'editor');

INSERT INTO USUARIO (Correo, Foto, Nombre, Telefono, Contrasena, Rol)
VALUES(
'123@123.com',
'data:image/png;base64,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',
'Jose Parga', 
'555555555555', 
'123', 
'reportero');

INSERT INTO USUARIO (Correo, Foto, Nombre, Telefono, Contrasena, Rol)
VALUES(
'ppp@ppp.com',
'data:image/png;base64,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',
'Pepe Melañes', 
'555555555555', 
'123', 
'usuario');

INSERT INTO USUARIO (Correo, Foto, Nombre, Telefono, Contrasena, Rol)
VALUES(
'bbb@bbb.com',
'data:image/png;base64,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',
'Beto Aguirre', 
'555555555555', 
'123', 
'usuario');

INSERT INTO USUARIO (Correo, Foto, Nombre, Telefono, Contrasena, Rol)
VALUES(
'ttt@ttt.com',
'data:image/png;base64,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',
'Tom Jhonson', 
'555555555555', 
'123', 
'usuario');

#Secciónes
INSERT INTO Seccion(Nombre, Color)
VALUES('Deportes', '3380cc');

INSERT INTO Seccion(Nombre, Color)
VALUES('Ambiente', '80cc33');

INSERT INTO Seccion(Nombre, Color, Orden)
VALUES('Hoy', '3334cc', 1);

INSERT INTO Seccion(Nombre, Color)
VALUES('Internacional', 'cc7f33');

INSERT INTO noticia(Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Palabras, Escritor, Seccion)
VALUES(
	'en redaccion',
    'Cangrejos Chiapanecos',
    'Ataque de cangrejos chiapanecos',
    'LOS CANGREJOS ATACARON A UN HOMBRE POR LA CARRETERA',
    current_date(),
    'Chiapas',
    'Chiapas, Cangrejo, Cangrejos, Ataque, Chiapaneco, Chiapanecos',
    2,
    1
);

INSERT INTO noticia(Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Palabras, Escritor, Seccion)
VALUES(
	'en redaccion',
    'Otra noticia',
    'Algo paso, no se que',
    'Al chile ni idea, pero se ocupa hacer una noticia **bold**',
    current_date(),
    'Meijiko',
    'Algo, algo2, Chiapas, Cangrejos',
    2,
    2
);

INSERT INTO noticia(Estado, Titulo, Resumen, Contenido, Fecha, Ubicacion, Palabras, Escritor, Seccion)
VALUES(
	'en redaccion',
    'EXTRAAAAAAA EXTRAAAAAAAAAAAAA',
    'Yo no fui, fué teté',
    'Pegale, pegale este merito fué',
    current_date(),
    'Ching chong, China',
    'Ching, chong, Ping, Pong, Rasista, ya sé',
    2,
    4
);

#SELECT N.titulo, U.nombre FROM usuario U INNER JOIN noticia N ON U.ID = N.escritor

/*
UPDATE noticia N
	inner join multimedia M
    ON N.ID = M.Noticia
SET N.Foto = M.ID;
*/

call sp_noticia_get();
SELECT*FROM usuario;
SELECT*FROM Seccion;
SELECT*FROM Noticia;
SELECT*FROM multimedia;

call sp_noticia_get();

call sp_get_similar('Chiapas,cHING');

call sp_noticia_get_estado('en redaccion');