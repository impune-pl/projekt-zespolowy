ALTER TABLE test."Tokens"
    DROP CONSTRAINT "Tokens_expirationTimestamp_check";

INSERT INTO test."Tokens"(
	"userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired")
	VALUES (1, '123', localtimestamp, localtimestamp-interval '1 day', FALSE),
	(2, '1234', localtimestamp, localtimestamp-interval '30 days', FALSE),
	(2, '12345', localtimestamp, localtimestamp-interval '90 days', FALSE),
	(3, '123456', localtimestamp, localtimestamp-interval '365 days', FALSE),
	(4, '1234567', localtimestamp, localtimestamp-interval '7 days', FALSE),
	(6, '12345678', localtimestamp, localtimestamp-interval '21 days', FALSE),
	(6, '1234567891', localtimestamp, localtimestamp-interval '54 days', FALSE),
	(1, '12345678912', localtimestamp, localtimestamp+interval '1 days', FALSE),
	(2, '123456789123', localtimestamp, localtimestamp+interval '7 days', FALSE),
	(3, '1234567891234', localtimestamp, localtimestamp+interval '21 days', FALSE),
	(3, '12345678912345', localtimestamp, localtimestamp+interval '90 days', FALSE),
	(5, '123456789123456', localtimestamp, localtimestamp+interval '30 days', FALSE),
	(7, '1234567891234567', localtimestamp, localtimestamp+interval '365 days', FALSE),
	(7, '12345678912345678', localtimestamp, localtimestamp+interval '54 days', FALSE);


ALTER TABLE test."Tokens"
    ADD CONSTRAINT "Tokens_expirationTimestamp_check" CHECK (("expirationTimestamp" > LOCALTIMESTAMP)) NOT VALID;