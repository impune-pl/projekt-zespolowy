BEGIN;

INSERT INTO public."Users"(
	"phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp")
	VALUES 	('868-487-6466','Nulla.eget@Seddiam.ca','1',NULL, NULL, NULL),
			('334-680-1989','libero.Donec.consectetuer@nisi.ca','1',NULL, NULL, NULL),
			('788-481-5669','adipiscing@lectuspede.net','1',NULL, NULL, NULL),
			('928-585-4950','mollis@sodales.ca','1',NULL, NULL, NULL),
			('774-107-9376','eu.dolor.egestas@purus.net','1',NULL, NULL, NULL),
			('486-936-7928','Suspendisse.commodo.tincidunt@ideratEtiam.co.uk','1',NULL, NULL, NULL),
			('970-932-3784','pharetra.felis@at.org','1',NULL, NULL, NULL),
			('457-348-5700','interdum@nibhsit.co.uk','1',NULL, NULL, NULL),
			('784-905-8489','risus@dolor.org','1',NULL, NULL, NULL),
			('822-560-9699','tincidunt@auctorMauris.net','1',NULL, NULL, NULL);


-- First disable check on timestamp
INSERT INTO public."Tokens"(
	"userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired")
	VALUES (1, '123', localtimestamp, localtimestamp-interval '1 day', FALSE),
	(2, '1234', localtimestamp, localtimestamp-interval '30 days', FALSE),
	(3, '12345', localtimestamp, localtimestamp-interval '90 days', FALSE),
	(4, '123456', localtimestamp, localtimestamp-interval '365 days', FALSE),
	(5, '1234567', localtimestamp, localtimestamp-interval '7 days', FALSE),
	(6, '12345678', localtimestamp, localtimestamp-interval '21 days', FALSE),
	(7, '1234567891', localtimestamp, localtimestamp-interval '54 days', FALSE),
	(1, '12345678912', localtimestamp, localtimestamp+interval '1 days', FALSE),
	(2, '123456789123', localtimestamp, localtimestamp+interval '7 days', FALSE),
	(3, '1234567891234', localtimestamp, localtimestamp+interval '21 days', FALSE),
	(4, '12345678912345', localtimestamp, localtimestamp+interval '90 days', FALSE),
	(5, '123456789123456', localtimestamp, localtimestamp+interval '30 days', FALSE),
	(6, '1234567891234567', localtimestamp, localtimestamp+interval '365 days', FALSE),
	(7, '12345678912345678', localtimestamp, localtimestamp+interval '54 days', FALSE);


INSERT INTO public."MessageTypes"(type)
	VALUES 	('TEXT'),
			('IMAGE');


INSERT INTO public."Contacts"(
	"userId", "contactId", "isLocationShared", "isBlocked", "isAccepted")
	VALUES 	(1, 2, FALSE, FALSE, FALSE);

UPDATE public."Contacts"
	SET "isAccepted"=TRUE
	WHERE id=1;

INSERT INTO public."Contacts"(
	"userId", "contactId", "isLocationShared", "isBlocked", "isAccepted")
	VALUES	(2, 3, FALSE, FALSE, FALSE),
	
UPDATE public."Contacts"
	SET "isAccepted"=TRUE
	WHERE id=2;
			
INSERT INTO public."Contacts"(
	"userId", "contactId", "isLocationShared", "isBlocked", "isAccepted")
	VALUES  (3, 4, FALSE, FALSE, FALSE),
			(4, 1, FALSE, FALSE, FALSE);

INSERT INTO public."Messages"(
	"contactId", "typeId", content, "time")
	VALUES (1, 1, '1', localtimestamp),
	(1, 1, '2', localtimestamp+interval '10 seconds'),
	(1, 1, '3', localtimestamp+interval '20 seconds'),
	(2, 1, '4', localtimestamp+interval '30 seconds'),
	(2, 1, '5', localtimestamp+interval '40 seconds'),
	(2, 1, '6', localtimestamp+interval '50 seconds'),
	(1, 1, '7', localtimestamp+interval '60 seconds'),
	(1, 1, '8', localtimestamp+interval '60 seconds'),
	(2, 1, '9', localtimestamp+interval '70 seconds'),
	(1, 1, '10', localtimestamp+interval '70 seconds'),
	(2, 1, '11', localtimestamp+interval '80 seconds'),
	(1, 1, '12', localtimestamp+interval '90 seconds'),
	(2, 1, '13', localtimestamp+interval '100 seconds'),
	(1, 1, '14', localtimestamp+interval '110 seconds'),
	(2, 1, '15', localtimestamp+interval '120 seconds'),
	(3, 1, '16', localtimestamp+interval '10 seconds'),
	(4, 1, '17', localtimestamp+interval '20 seconds'),
	(4, 1, '18', localtimestamp+interval '30 seconds'),
	(4, 1, '19', localtimestamp+interval '40 seconds'),
	(3, 1, '20', localtimestamp+interval '50 seconds'),
	(3, 1, '21', localtimestamp+interval '60 seconds'),
	(4, 1, '22', localtimestamp+interval '70 seconds'),
	(3, 1, '23', localtimestamp+interval '80 seconds'),
	(4, 1, '24', localtimestamp+interval '90 seconds'),
	(4, 1, '25', localtimestamp+interval '100 seconds'),
	(4, 1, '26', localtimestamp+interval '110 seconds'),
	(3, 1, '27', localtimestamp+interval '120 seconds'),
	(3, 1, '28', localtimestamp+interval '130 seconds'),
	(1, 1, '29', localtimestamp+interval '130 seconds'),
	(2, 1, '30', localtimestamp+interval '140 seconds');

COMMIT;