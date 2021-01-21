--Pierwsze zapytanie
SELECT * FROM "Contacts"
--Drugie zapytanie
UPDATE public."Contacts"
    SET "isAccepted"=TRUE
    WHERE id=4 OR id=3;
--Trzecie zapytanie
SELECT * FROM "Contacts" c1,"Contacts" c2 WHERE c1."userId"=c2."contactId" AND c2."userId"=c1."contactId";