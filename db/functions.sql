USE BDMM_DB;

delimiter //
CREATE FUNCTION SPLIT_STR(
     x TEXT,
     delim VARCHAR(12),
     pos INT
)
RETURNS VARCHAR(255)
RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos),
          LENGTH(SUBSTRING_INDEX(x, delim, pos -1)) + 1),delim, '');//

CREATE FUNCTION REGEX_FROM_CSV(pPalabras TEXT)
RETURNS TEXT
BEGIN
	DECLARE m_regex TEXT default('(');

	DECLARE a INT Default 0 ;
	DECLARE str VARCHAR(255);
	simple_loop: LOOP
		SET a=a+1;
		SET str=SPLIT_STR(pPalabras,",",a);
		IF str='' THEN
		   LEAVE simple_loop;
		END IF;
        SET m_regex = CONCAT(m_regex,str,'|');
	END LOOP simple_loop;
    
	SET m_regex = concat(left(m_regex,length(m_regex)-1),')');
    
    RETURN m_regex;
END;

CREATE FUNCTION LIKE_COUNT(pNoticia INT)
RETURNS INT
RETURN (SELECT COUNT(ID) from me_gusta WHERE Noticia = pNoticia );