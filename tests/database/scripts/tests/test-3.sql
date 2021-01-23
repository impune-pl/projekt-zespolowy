--Zestaw zapytań
INSERT INTO test."Users"(
	"phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp")
	VALUES 	('868-487-6466','','1',NULL, NULL, NULL);
INSERT INTO test."Users"(
	"phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp")
	VALUES 	('','libero.Donec.consectetuer@nisi.ca','1',NULL, NULL, NULL);
INSERT INTO test."Users"(
	"phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp")
	VALUES 	('','','1',NULL, NULL, NULL);
INSERT INTO test."Users"(
	"phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp")
	VALUES 	('928-585-4950','Dśąćlis@ąćąles-c','1',NULL, NULL, NULL);
INSERT INTO test."Users"(
	"phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp")
	VALUES ('774-107-AAAA','Dśąćliś@ąćąles-c','1',NULL, NULL, NULL);
INSERT INTO test."Users"(
	"phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp")
	VALUES ('970-932-3784','pharetra.felis@at.org','1',NULL, NULL, NULL);
--Pierwsze zapytanie
SELECT * FROM test."Users";