DROP DATABASE BDMM_DB;
CREATE DATABASE BDMM_DB;
USE BDMM_DB;

# Las Fotos de perfil son codificadas en base64, asi que
# las regresamos en un json para usarlos como url
# con su contenido actual no son muy pesadas para la response
CREATE TABLE usuario(
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
	Correo			VARCHAR(30)		NOT NULL UNIQUE,
    Foto			MEDIUMBLOB			NULL,
    Nombre			TINYTEXT		NOT NULL,
	Telefono		VARCHAR(12)		NULL,
    Contrasena		TINYTEXT		NOT NULL,
    Rol				ENUM('usuario', 'reportero', 'editor') DEFAULT 'reportero',
    Activo			BOOL			DEFAULT true
);
CREATE TABLE seccion(
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
    Nombre			TINYTEXT		NOT NULL,
    Color			VARCHAR(6)		NULL,
    Activa			BOOL			DEFAULT true,
    Orden			INT				DEFAULT 0
);

CREATE TABLE multimedia(
	ID				INT 							AUTO_INCREMENT PRIMARY KEY,
    Tipo			VARCHAR(30)                     NOT NULL,
    Contenido		BLOB						    NOT NULL,
    Noticia 		INT 							NULL
);

CREATE TABLE noticia(
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
    Estado			ENUM('en redaccion', 'terminada', 'publicada') DEFAULT 'en redaccion',
    Titulo			TINYTEXT		NOT NULL,
    Resumen			TINYTEXT		NULL,
    Contenido		LONGTEXT		NOT NULL,
    Fecha			DATETIME		NOT NULL,
    Ubicacion		TINYTEXT		NOT NULL,
    Visitas			INT				DEFAULT 0,
    Palabras		TEXT			NULL,			-- Palabras Clave
    Prioridad       INT             NOT NULL,
    
    Escritor		INT				NOT NULL,
    CONSTRAINT FK_ESCRITOR FOREIGN KEY (Escritor)
    REFERENCES usuario(ID),
    
    Seccion			INT				NOT NULL,
    CONSTRAINT FK_SECCION FOREIGN KEY (Seccion)
    REFERENCES seccion(ID),
    Foto            INT             default 1,
    CONSTRAINT FK_FOTO_NOTICIA FOREIGN KEY(Foto) 
    REFERENCES multimedia(ID) ON DELETE CASCADE
    
);

CREATE TABLE comentario(
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
	Contenido		TEXT			NOT NULL,
    Fecha			DATETIME		NOT NULL  DEFAULT(current_date()),
    Padre           INT             NULL,
    Noticia			INT				NOT NULL,
    CONSTRAINT FK_NOTICIA FOREIGN KEY (Noticia)
    REFERENCES noticia(ID),
    
    Usuario			INT				NOT NULL,
    CONSTRAINT FK_USUARIO FOREIGN KEY (Usuario)
    REFERENCES usuario(ID)
);
CREATE TABLE me_gusta(	
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
    
	Noticia			INT				NOT NULL,
    CONSTRAINT FK_NOTICIA_LIKE FOREIGN KEY (Noticia)
    REFERENCES noticia(ID),
    
    Usuario			INT				NOT NULL,
    CONSTRAINT FK_USUARIO_LIKE FOREIGN KEY (Usuario)
    REFERENCES usuario(ID)
);