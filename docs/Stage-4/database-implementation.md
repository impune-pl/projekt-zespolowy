# Wybrane fragmenty implementacji bazy danych
Ten dokument opisuje wybrane fragmenty implementacji bazy danych.

## Tworzenie i przypisywanie wyzwalacza do tabeli Contacts
Wyzwalacz ten ma za zadanie dodać wiersz o zamienionych wartościach w polach userId i contactId do tabeli Contacts po zaakceptowaniu jednostronnej prośby o kontakt, w ten sposób tworząc pełny, obustronny, kontakt.
```sql
-- defnicja funkcji dla wyzwalacza
CREATE FUNCTION test."OnContactUpdate"() RETURNS trigger
    LANGUAGE plpgsql STRICT
    AS $$
BEGIN
    IF OLD."isAccepted" = FALSE AND NEW."isAccepted" = TRUE THEN
        INSERT INTO "Contacts"("userId","contactId","isLocationShared","isBlocked","isAccepted")
        VALUES (OLD."contactId", OLD."userId", false, false, true);
    END IF;
    return NEW;
END;
$$;
-- stworzenie tabeli Contacts
-- pominięte
-- stworzenie i przypisanie wyzwalacza
CREATE TRIGGER "OnContactUpdate" AFTER UPDATE OF "isAccepted" ON test."Contacts" FOR EACH ROW EXECUTE FUNCTION test."OnContactUpdate"();
```

## Tworzenie i przypisywanie wyzwalacza do tabeli Contacts
Wyzwalacz ten ma za zadanie zaktualizowanie pola lastLocationTimestamp po zaktualizowaniu lokalizacji użytkownika.
```sql
-- defnicja funkcji dla wyzwalacza
CREATE FUNCTION test."OnUserUpdate"() RETURNS trigger
    LANGUAGE plpgsql STABLE STRICT
    AS $$
BEGIN
    IF NEW."lastLocation" != OLD."lastLocation" THEN
        NEW."lastLocationTimestamp" = LOCALTIMESTAMP;
    END IF;
    return NEW;
END;
$$;
-- stworzenie tabeli Users
-- pominięte
-- stworzenie i przypisanie wyzwalacza
CREATE TRIGGER "OnUserUpdate" BEFORE UPDATE OF "lastLocation" ON test."Users" FOR EACH ROW EXECUTE FUNCTION test."OnUserUpdate"();
```

## Nakładanie ograniczeń na zawartości pól w tabeli Users
Ograniczenia te mają za zadanie uniemożliwić umieszczenie w bazie danych nieprawidłowych wartości w polach phoneNumber i email tabeli Users. Wykorzystują wyrażenia regularne stworzone na podstawie dostępnych informacji na temat sposobów zapisu numerów telefonów oraz znaków dostępnych do użycia w adresach email.
```sql
-- definicja i powiązanie z kolumną tabeli wyrażenia regularnego do testowania adresów email
ALTER TABLE test."Users"
    ADD CONSTRAINT email CHECK (((email)::text ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'::text)) NOT VALID;
-- definicja i powiązanie z kolumną tabeli wyrażenia regularnego do testowania numerów telefonów
ALTER TABLE test."Users"
    ADD CONSTRAINT "phoneNumber" CHECK ((("phoneNumber")::text ~ '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'::text)) NOT VALID;
```

## Tworzenie funkcji usuwającej tokeny które wygasły
Ta funkcja, uruchamiana okresowo przez serwer, ma za zadanie oczyszczanie tabeli Tokens z przeterminowanych tokenów.
```sql
-- defnicja funkcji
CREATE FUNCTION test."RemoveExpiredTokensByTimestamps"() RETURNS void
    LANGUAGE sql
    AS $$
DELETE FROM "Tokens"
WHERE "Tokens"."expirationTimestamp" < localtimestamp
$$;
```