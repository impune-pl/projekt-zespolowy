# Projekt testów

Testowanie stanowi ważną część cyklu życia projektu. Nieprawidłowe przeprowadzenie testów lub ich brak może spowodować że dostarczone oprogramowanie będzie zawierało błędy.
Poniżej opisane są sposoby przeprowadzania testów wybranych funkcjonalności poszczególnych komponentów systemu.

## Testy aplikacji klienckiej

## Testy serwera

### Wybrane przypadki testowe

Testy serwera będą polegały na sprawdzeniu prawidłowości działania następujących elementów:

1. Logowanie użytkownika z poprawnymi oraz nieprawidłowymi danymi w postaci numeru oraz hasła.
2. Rejestracja użytkownika w przypadku gdy już taki użytkownik istnieje oraz kiedy nie istnieje.
3. Wysłanie wiadomości
4. Sprawdzenie nowych wiadomości

### Metodologia testów bazy danych

Stan przed rozpoczęciem każdego testu:

-   Serwer korzysta z klasy naśladującej bazę danych z przygotowanymi wcześniej danymi do testów.
-   Serwer jest uruchamiany.

#### Ad. 1. Test 1:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników

Przeprowadzanie testu:

-   Wywołanie rządania logowania z podanymi danymi, które znajdują się w bazie danych.

Spodziewany wynik:

-   W bazie danych został utworzony token dla użytkownika
-   Rządanie zwrócuło wartość pozytywną (true), oznaczającą pomyślny przebieg logowania

#### Ad. 1. Test 2:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników

Przeprowadzanie testu:

-   Wywołanie rządania logowania z podanymi danymi, które nie znajdują się w bazie danych.

Spodziewany wynik:

-   Rządanie zwrócuło wartość negatywną (false), oznaczającą nieudane logowanie do systemu

#### Ad. 2. Test 1:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników

Przeprowadzanie testu:

-   Wywołanie rządania rejestracji z podanymi danymi, które znajdują się w bazie danych.

Spodziewany wynik:

-   Rządanie zwrócuło wartość negatywną (false), oznaczającą nieudaną rejestrację w systemie

#### Ad. 2. Test 2:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników

Przeprowadzanie testu:

-   Wywołanie rządania rejestracji z podanymi danymi, które nie znajdują się w bazie danych.

Spodziewany wynik:

-   W bazie danych pojawił się nowy użytkownik z podanymi przy rejestracji danymi
-   Rządanie zwrócuło wartość pozytywną (true), oznaczającą pomyślny przebieg rejestracji

#### Ad. 3. Test 1:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi id autora i adresata oraz wiadomość z jej typem

Spodziewany wynik:

-   W bazie danych w tabeli z wiadomościami pojawi się nowy wpis z wiadomością i jej typem
-   Rządanie zwrócuło wartość pozytywną (true), oznaczającą pomyślny przebieg wysłania wiadomosci

#### Ad. 3. Test 2:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi nieprawidłowe id autora, prawidłowe id adresata oraz wiadomość z jej typem

Spodziewany wynik:

-   Rządanie zwrócuło wartość negatywną (false), oznaczającą nieudane wysłanie wiadomości

#### Ad. 3. Test 3:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi id autora, nieprawidłowe id adresata oraz wiadomość z jej typem

Spodziewany wynik:

-   Rządanie zwrócuło wartość negatywną (false), oznaczającą nieudane wysłanie wiadomości

#### Ad. 3. Test 4:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi id autora, id adresata oraz wiadomość z nieprawidłowy typem

Spodziewany wynik:

-   Rządanie zwrócuło wartość negatywną (false), oznaczającą nieudane wysłanie wiadomości

#### Ad. 3. Test 5:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi id autora, id adresata oraz pustą wiadomość z jej typem

Spodziewany wynik:

-   Rządanie zwrócuło wartość negatywną (false), oznaczającą nieudane wysłanie wiadomości

#### Ad. 4. Test 1:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu
-   Umieszczenie w bazie 20 wiadomości dla wcześniej wspomnianego kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania sprawdzenie nowych wiadomości, podając id 15 wiadomości

Spodziewany wynik:

-   Rządanie zwrócuło wartość pozytywną (true), oznaczającą obecność nowych wiadomości

#### Ad. 4. Test 2:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu
-   Umieszczenie w bazie 20 wiadomości dla wcześniej wspomnianego kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania sprawdzenie nowych wiadomości, podając id 20 wiadomości

Spodziewany wynik:

-   Rządanie zwrócuło wartość negatywną (false), oznaczającą brak nowych wiadomości

## Testy bazy danych

Testy bazy danych będą polegały na manualnym sprawdzeniu prawidłowości działania następujących elementów:

1. Okresowe skanowanie i usuwanie tokenów których ważność wygasła w tabeli Tokens.
1. Automatyczne tworzenie kontaktów po zaakceptowaniu prośby o dodanie do kontaktów w tabeli Contacts.
1. Sprawdzenie poprawności działania wyrażeń regularnych na kolumnach phone number i email tabeli Users.

### Metodologia testów bazy danych

Stan przed rozpoczęciem każdego testu:

-   Baza danych istnieje i zawiera puste tabele ze zdefiniowanymi relacjami, ograniczeniami, wyzwalaczami oraz procedurami składowymi.
-   Istnieje konto użytkownika w systemie zarządzania bazą danych mającego uprawnienia do bazy danych identyczne z uprawnieniami którymi posługuje się serwer produkcyjny.

Uwaga - jeśli w opisie rekordów umieszczanych w bazie danych pole nie jest uwzględnione, oznacza to że ma mieć dowolną prawidłową z punktu widzenia ograniczeń nałożonych na to pole zawartość. Wyjątkiem jest pole id (klucz główny), które ma być puste.

#### Ad. 1. Test 1:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie czternastu tokenów testowych:
    -   Zestaw A - siedem tokenów których data wygaśnięcia upłynie w przyszłości, różnica między datą przeprowadzenia testu a datą wygaśnięcia wynosi co najmniej jeden dzień.
    -   Zestaw B - siedem tokenów których data wygaśnięcia upłynęła do najmniej dzień przed przeprowadzeniem testu.

Tokeny są powiązane z kontami użytkowników w następujący sposób:  
|numer konta|liczba tokenów zestawu A|liczba tokenów zestawu B|
|---|---|---|
|1|1|1|  
|2|2|1|
|3|1|2|
|4|1|0|
|5|0|1|
|6|2|0|
|7|0|2|

Przeprowadzanie testu:

-   Uruchomienie procedury składowanej służącej do usuwania wygaśniętych tokenów.

Spodziewany wynik:

-   Usunięcie z bazy tokenów należących do zestawu B
-   Wszystkie siedem tokenów należących do zestawu A pozostało w bazie, a ich rekordy nie zostały zmodyfikowane

#### Ad. 2. Test 1:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie czterech kont użytkowników
-   Umieszczenie w bazie czterech kontaktów testowych. Kontakty wiążą ze sobą konta użytkowników. Wszystkie kontakty pozostają niezaakceptowane (wartość w polu isAccepted jest równa 0 (fałsz))

Kontakty wiążą konta użytkowników w następujący sposób:  
|numer konta|nr konta-kontaktu|
|---|---|
|1|2|
|2|3|
|3|4|
|4|1|

Przeprowadzanie testu:

-   Aktualizacja pola isAccepted dwóch losowo wybranych kontaktów do wartości 1 (prawda).

Spodziewany wynik:

-   Powstanie dwóch nowych kontaktów o wartościach w polach userId i contactId zamienionych miejscami w stosunku do wybranych i wartości zawartej w polach isAccepted równej 1 (prawda).
-   Zmiana wartości w polach isAccepted wybranych kontaktów do na wartość 1 (prawda).
-   Brak zmian w innych polach niż opisane powyżej.
-   Brak zmian w nie wybranych kontaktach.

#### Ad. 3. Test 1:

---

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   brak

Przeprowadzanie testu:

-   Próba umieszczenia w bazie siedmiu kont użytkowników:
    -   konto z pustym ciągiem znaków w polu email
    -   konto z pustym ciągiem znaków w polu phoneNumber
    -   konto z pustymi ciągami znaków w polach email i phoneNumer
    -   konto z ciągiem losowych znaków (co najmniej jeden znak specjalny inny niż . lub @) w polu email
    -   konto z ciągiem losowych znaków (co najmniej jeden znak inny niż cyfra 0-9) w polu phoneNumer
    -   konto z ciągami losowych znaków, (co najmniej jeden znak inny niż cyfra 0-9) w polu phoneNumer, (co najmniej jeden znak specjalny inny niż . lub @) w polu email
    -   konto z prawidłowymi wartościami wszystki pól

Spodziewany wynik:

-   Pierwsze sześć prób umieszczenia w bazie nowego konta użytkownika zakończy się niepowodzeniem.
-   Siódma próba doprowadzi do umieszczenia w bazie konta użytkownika o parametrach indentycznych z przekazanymi.
