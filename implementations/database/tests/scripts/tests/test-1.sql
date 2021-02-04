--Pierwsze zapytanie
SELECT COUNT(*) FROM "Tokens" WHERE "expirationTimestamp" < localtimestamp;
--Drugie zapytanie
SELECT COUNT(*) FROM "Tokens" WHERE NOT("expirationTimestamp" < localtimestamp);
--Trzecie zapytanie
SELECT "RemoveExpiredTokensByTimestamps"();
--Czwarte zapytanie
SELECT COUNT(*) FROM "Tokens" WHERE "expirationTimestamp" < localtimestamp;
--Piąte zapytanie
SELECT COUNT(*) FROM "Tokens" WHERE "expirationTimestamp" < localtimestamp;