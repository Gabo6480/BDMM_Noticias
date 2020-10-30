
CREATE TABLE usuario(
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
	Correo			TINYTEXT		NOT NULL UNIQUE,
    Foto			BLOB			NULL,
    Nombre			TINYTEXT		NOT NULL,
    Contraseña		TINYTEXT		NOT NULL,
    Rol				ENUM('usuario', 'reportero', 'editor') DEFAULT 'reportero',
    Activo			BOOL			DEFAULT true
);

CREATE TABLE seccion(
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
    Nombre			TINYTEXT		NOT NULL,
    Color			VARCHAR(6)		NULL,
    Activa			BOOL			DEFAULT true,
    Orden			INT				NULL
);

CREATE TABLE noticia(
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
    Estado			ENUM('en redaccion', 'terminada', 'publicada') DEFAULT 'en redaccion',
    Titulo			TINYTEXT		NOT NULL,
    Resumen			TINYTEXT		NULL,
    Contenido		TEXT			NOT NULL,
    Fecha			DATETIME		NOT NULL,
    Ubicacion		TINYTEXT		NOT NULL,
    Visitas			INT				DEFAULT 0,
    Palabras		TEXT			NULL,			-- Palabras Clave
    
    Escritor		INT				NOT NULL,
    CONSTRAINT FK_ESCRITOR FOREIGN KEY (Escritor)
    REFERENCES usuario(ID),
    
    Seccion			INT				NOT NULL,
    CONSTRAINT FK_SECCION FOREIGN KEY (Seccion)
    REFERENCES seccion(ID)
    
);

CREATE TABLE comentario(
	ID				INT				AUTO_INCREMENT PRIMARY KEY,
	Contenido		TEXT			NOT NULL,
    Fecha			DATETIME		NOT NULL,
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
    CONSTRAINT FK_NOTICIA FOREIGN KEY (Noticia)
    REFERENCES noticia(ID),
    
    Usuario			INT				NOT NULL,
    CONSTRAINT FK_USUARIO FOREIGN KEY (Usuario)
    REFERENCES usuario(ID)
);