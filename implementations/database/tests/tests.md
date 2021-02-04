# Testy bazy danych
Ten dokument opisuje sposób przygotowania, przeprowadzania testów bazy danych oraz weryfikacji ich wyników.

## Przygotowanie do testów
Do testów utworzona zostaje baza danych o nazwie ciat_testing. Przed wykonaniem każdego testu zostaje utworzony nowy schemat o nazwie test.
Na schematacie zostaje wykonany skrypt: create-test-env.sql z katalogu ./scripts/schemas/
Następnie do obu schematu ładowane są dane za pomocą odpowiednio modyfikowanych pod kontem wymagań testu skryptów znajdujących się w ./scripts/placeholder-data/
Po zakończeniu testu schemat zostaje usunięty z bazy.

## Wykonanie testów
Wykonanie testów polega na uruchomieniu skryptów znajdujących się w katalogu ./scripts/tests oraz weryfikacji wyników.

## Wyniki testów
Poniżej opisane są przebiegi i wyniki testów bazy danych opisanych w dokumentacji. 

### Test 1
#### Przebieg:
Wykonanie pierwszego zapytania - zapytanie zwraca pojedynczy wiersz z jedną kolumną, w niej liczba tokenów które wygasły = 7.
Wykonanie drugiego zapytania - zapytanie zwraca pojedynczy wiersz z jedną kolumną, w niej liczba tokenów które nie wygasły = 7.
Wykonanie trzeciego zapytania - zapytanie nie zwraca wyników, wywołuje jednak funkcję.
Wykonanie czwartego zapytania - zapytanie zwraca pojedynczy wiersz z jedną kolumną, w niej liczba tokenów które wygasły = 0.
Wykonanie piątego zapytania - zapytanie zwraca pojedynczy wiersz z jedną kolumną, w niej liczba tokenów które nie wygasły = 7.

#### Wynik:
Test zakończony powodzeniem - wywołanie funkcji doprowadziło do usunięcia wygaśniętych tokenów, a jednocześnie nie usunęło tokenów które jeszcze nie wygasły.

### Test 2
#### Przebieg:
Wykonanie pierwszego zapytania - zapytanie zwraca cztery wiersze zawierające informacje o kontaktach. Kontakty opisują relacje między użytkownikami zgodnie ze specyfikacją testu.
Wykonanie drugiego zapytania - zapytanie zwraca potwierdzenie modyfikacji danych.
Wykonanie trzeciego zapytania - zapytanie zwraca cztery wiersze zawierające informacje o zaakceptowanych kontaktach.

#### Wynik:
Test zakończony powodzeniem - wykonanie drugiego zapytania doprowadziło do aktywacji wyzwalacza, który utworzył kontakty działające w odwrotną stronę do aktualizowanych. Zostało to potwierdzone przez wykonanie trzeciego zapytania - dwa z czterech zwróconych wierszy znajdowały się w wynikach pierwszego zapytania, a dwa pojawiły się w wyniku wykonania drugiego zapytania.

### Test 3
#### Przebieg:
Wykonanie zestawu zapytań po jednym zapytaniu na raz - pierwszych pięć zapytań z zestawu zwraca błędy wynikające z prób naruszenia ograniczeń kolum email lub phoneNumber. Szóste zapytanie zostaje wykonane z powodzeniem.
Wykonanie pierwszego zapytania - zapytanie zwraca jeden wiersz zawierający dane wprowadzone przez szóste zapytanie z zestawu.

#### Wynik:
Test zakończony powodzeniem - Jedynie wiersz zawierający prawidłowe dane został umieszczony w tabeli.