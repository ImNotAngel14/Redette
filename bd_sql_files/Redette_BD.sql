CREATE SCHEMA Redette;

CREATE TABLE Redette.users
(
	id_user INT AUTO_INCREMENT NOT NULL UNIQUE,
	username VARCHAR(32) NOT NULL UNIQUE,
    user_password VARCHAR(32) NOT NULL
);

DELIMITER //

CREATE PROCEDURE Redette.`sp_authLogin`
(
    IN p_Username VARCHAR(32), 
    IN p_User_pass VARCHAR(32)
)
BEGIN
DECLARE found_user BOOLEAN DEFAULT FALSE;
	SELECT EXISTS
    (
		SELECT username FROM Redette.users
		WHERE username COLLATE utf8mb4_bin = p_Username
		AND user_password COLLATE utf8mb4_bin = p_User_pass
	) INTO found_user;
    SELECT found_user;
END;//

DELIMITER ;

DROP PROCEDURE Redette.sp_authLogin;


-- Pruebas
CALL Redette.sp_authLogin('Imnot', 'HCLAFax8');

SELECT * FROM Redette.users;

INSERT INTO Redette.users (username, user_password) VALUES ('imnot','HCLAFax8');