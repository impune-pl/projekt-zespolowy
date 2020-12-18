# Projekt testów
Testowanie stanowi ważną część cyklu życia projektu. Nieprawidłowe przeprowadzenie testów lub ich brak może spowodować że dostarczone oprogramowanie będzie zawierało błędy. 
Poniżej opisane są sposoby przeprowadzania testów wybranych funkcjonalności poszczególnych komponentów systemu.

## Testy aplikacji klienckiej
---  

### Wybrane przypadki testowe
Testy aplikacji klienckiej będą polegały na sprawdzeniu prawidłowości działania następujących elementów:

1. Formularz Logowania użytkownika.
2. Formularz Rejestracji użytkownika.
3. Wyświetlanie znajomych
4. Wyszukiwanie znajomego
5. Wysłanie wiadomości
6. Sprawdzenie nowych wiadomości


### Przygotowanie testów aplikacji klienckiej

Stan przed rozpoczęciem każdego testu:

-   Aplikacja korzysta z usługi naśladującej podstawowe funkcje serwera.
-   Aplikacja jest uruchamiana lokalnie.

#### Ad. 1. Test 1:

Metoda działania:  
Manualna  
Przygotowanie testu:

-   Wypełnienie formularza logowania danymi.

Przeprowadzanie testu:

-   Kliknięcie guzika zaloguj.

Spodziewany wynik:

-   Do usługi naśladującej serwer zostanie wysłane żądanie logowania.
-   Żądanie zawiera wprowadzone w formularz dane.

#### Ad. 2. Test 1:

Metoda działania:  
Manualna  
Przygotowanie testu:

-   Wypełnienie formularza rejestracji danymi.

Przeprowadzanie testu:

-   Kliknięcie guzika zarejestruj.

Spodziewany wynik:

-   Do usługi naśladującej serwer zostanie wysłane żądanie rejestracji.
-   Żądanie zawiera wprowadzone w formularz dane.

#### Ad. 3. Test 1:

Metoda działania:  
Manualna  
Przeprowadzanie testu:

-   Otwarcie listy znajomych.

Spodziewany wynik:

-   Do usługi naśladującej serwer zostanie wysłane żądanie o listę znajomych.
-   Usługa zwróciła przykładowe dane.
-   Na liście znajomych zostały wyświetlone przykładowe dane.

#### Ad. 4. Test 1:

Metoda działania:  
Manualna  
Przygotowanie testu:

-   Otwarcie listy znajomych.
-   Kliknięcie guzika dodaj znajomego.

Przeprowadzanie testu:

-   Wpisanie numeru telefonu w pole wyszukiwania.

Spodziewany wynik:

-   Do usługi naśladującej serwer zostanie wysłane żądanie wyszukiwania znajomego.
-   Żądanie zawiera wprowadzony numer telefonu.

#### Ad. 5. Test 1:

Metoda działania:  
Manualna  
Przygotowanie testu:

-   Otwarcie ekranu konwersacji.
-   Wpisanie treści wiadomości.

Przeprowadzanie testu:

-   Kliknięcie guzika "wyślij"

Spodziewany wynik:

-   Do usługi naśladującej serwer zostanie wysłane żądanie wysłania wiadomości.
-   Żądanie zawiera wprowadzone treść wiadomości.

#### Ad. 6. Test 1:

Metoda działania:  
Manualna  

Przeprowadzanie testu:

-   Otwarcie ekranu konwersacji.

Spodziewany wynik:

-   Do usługi naśladującej serwer zostanie wysłane żądanie sprawdzenia nowych wiadomości.
-   Usługa zwróci przykładowe wiadomości.
-   Na liście wiadomości zostaną wyświetlone przykładowe wiadomości.

----

## Testy serwera
---  

### Wybrane przypadki testowe

Testy serwera będą polegały na sprawdzeniu prawidłowości działania następujących elementów:

1. Logowanie użytkownika z poprawnymi w postaci numeru oraz hasła.
2. Logowanie użytkownika z nieprawidłowymi danymi w postaci numeru oraz hasła.
3. Rejestracja użytkownika w przypadku gdy już taki użytkownik istnieje.
4. Rejestracja użytkownika w przypadku gdy taki użytkownik nie istnieje.
5. Wysłanie wiadomości
6. Sprawdzenie nowych wiadomości

### Przygotowanie testów serwera

Stan przed rozpoczęciem każdego testu:

-   Serwer korzysta z klasy naśladującej bazę danych z przygotowanymi wcześniej danymi do testów.
-   Serwer jest uruchamiany.

#### Ad. 1. Test 1:

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników

Przeprowadzanie testu:

-   Wywołanie rządania logowania z podanymi danymi, które znajdują się w bazie danych.

Spodziewany wynik:

-   W bazie danych został utworzony token dla użytkownika
-   Rządanie zwróciło wartość pozytywną (true), oznaczającą pomyślny przebieg logowania

#### Ad. 2. Test 1:

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników

Przeprowadzanie testu:

-   Wywołanie rządania logowania z podanymi danymi, które nie znajdują się w bazie danych.

Spodziewany wynik:

-   Rządanie zwróciło wartość negatywną (false), oznaczającą nieudane logowanie do systemu

#### Ad. 3. Test 1:

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników

Przeprowadzanie testu:

-   Wywołanie rządania rejestracji z podanymi danymi, które znajdują się w bazie danych.

Spodziewany wynik:

-   Rządanie zwróciło wartość negatywną (false), oznaczającą nieudaną rejestrację w systemie

### Ad. 4. Test 1:

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników

Przeprowadzanie testu:

-   Wywołanie rządania rejestracji z podanymi danymi, które nie znajdują się w bazie danych.

Spodziewany wynik:

-   W bazie danych pojawił się nowy użytkownik z podanymi przy rejestracji danymi
-   Rządanie zwróciło wartość pozytywną (true), oznaczającą pomyślny przebieg rejestracji

### Ad. 5. Test 1:


Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi id autora i adresata oraz wiadomość z jej typem

Spodziewany wynik:

-   W bazie danych w tabeli z wiadomościami pojawi się nowy wpis z wiadomością i jej typem
-   Rządanie zwróciło wartość pozytywną (true), oznaczającą pomyślny przebieg wysłania wiadomosci

### Ad. 5. Test 2:


Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi nieprawidłowe id autora, prawidłowe id adresata oraz wiadomość z jej typem

Spodziewany wynik:

-   Rządanie zwróciło wartość negatywną (false), oznaczającą nieudane wysłanie wiadomości

### Ad. 5. Test 3:


Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi id autora, nieprawidłowe id adresata oraz wiadomość z jej typem

Spodziewany wynik:

-   Rządanie zwróciło wartość negatywną (false), oznaczającą nieudane wysłanie wiadomości

### Ad. 5. Test 4:


Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi id autora, id adresata oraz wiadomość z nieprawidłowy typem

Spodziewany wynik:

-   Rządanie zwróciło wartość negatywną (false), oznaczającą nieudane wysłanie wiadomości

### Ad. 5. Test 5:


Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania wysłania wiadomości zawierającymi id autora, id adresata oraz pustą wiadomość z jej typem

Spodziewany wynik:

-   Rządanie zwróciło wartość negatywną (false), oznaczającą nieudane wysłanie wiadomości

### Ad. 6. Test 1:


Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu
-   Umieszczenie w bazie 20 wiadomości dla wcześniej wspomnianego kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania sprawdzenie nowych wiadomości, podając id 15 wiadomości

Spodziewany wynik:

-   Rządanie zwróciło wartość pozytywną (true), oznaczającą obecność nowych wiadomości

### Ad. 6. Test 2:

Metoda działania:  
Automatyczna lub Manualna  
Przygotowanie testu:

-   Umieszczenie w bazie siedmiu kont użytkowników
-   Umieszczenie w bazie kontaktu
-   Umieszczenie w bazie 20 wiadomości dla wcześniej wspomnianego kontaktu

Przeprowadzanie testu:

-   Wywołanie rządania sprawdzenie nowych wiadomości, podając id 20 wiadomości

Spodziewany wynik:

-   Rządanie zwróciło wartość negatywną (false), oznaczającą brak nowych wiadomości


## Testy bazy danych
----
Testy bazy danych muszą sprawdzić działanie procedur składowanych, ograniczeń nałożonych na kolumny, wyzwalaczy i innych elementów składających się na bazę danych systemu, jednak nie powinny sprawdzać poprawności działania samej bazy danych.

### Wybrane przypadki testowe
1. Skanowanie i usuwanie tokenów których ważność wygasła w tabeli Tokens.
2. Automatyczne tworzenie kontaktów po zaakceptowaniu prośby o dodanie do kontaktów w tabeli Contacts.
3. Sprawdzenie poprawności działania wyrażeń regularnych na kolumnach phone number i email tabeli Users.
  
### Przygotowanie testów bazy danych

Stan przed rozpoczęciem każdego testu:  
- Baza danych istnieje i zawiera puste tabele ze zdefiniowanymi relacjami, ograniczeniami, wyzwalaczami oraz procedurami składowymi.
- Istnieje konto użytkownika w systemie zarządzania bazą danych mającego uprawnienia do bazy danych identyczne z uprawnieniami którymi posługuje się serwer produkcyjny.

Uwaga - jeśli w opisie rekordów umieszczanych w bazie danych pole nie jest uwzględnione, oznacza to że ma mieć dowolną prawidłową z punktu widzenia ograniczeń nałożonych na to pole zawartość. Wyjątkiem jest pole id (klucz główny), które ma być puste.

### Ad. 1. Skanowanie i usuwanie tokenów których ważność wygasła w tabeli Tokens:  

Sposób przeprowadzenia:  
Automatyczny lub Manualny  
Przygotowanie testu:
- Umieszczenie w bazie siedmiu kont użytkowników
- Umieszczenie w bazie czternastu tokenów testowych:
  - Zestaw A - siedem tokenów których data wygaśnięcia upłynie w przyszłości, różnica między datą przeprowadzenia testu a datą wygaśnięcia wynosi co najmniej jeden dzień.
  - Zestaw B - siedem tokenów których data wygaśnięcia upłynęła do najmniej dzień przed przeprowadzeniem testu.

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
- Uruchomienie procedury składowanej służącej do usuwania wygaśniętych tokenów.

Spodziewany wynik:
- Usunięcie z bazy tokenów należących do zestawu B
- Wszystkie siedem tokenów należących do zestawu A pozostało w bazie, a ich rekordy nie zostały zmodyfikowane

### Ad. 2. Automatyczne tworzenie kontaktów po zaakceptowaniu prośby o dodanie do kontaktów w tabeli Contacts:  

Sposób przeprowadzenia:  
Automatyczny lub Manualny  
Przygotowanie testu:
- Umieszczenie w bazie czterech kont użytkowników
- Umieszczenie w bazie czterech kontaktów testowych. Kontakty wiążą ze sobą konta użytkowników. Wszystkie kontakty pozostają niezaakceptowane (wartość w polu isAccepted jest równa 0 (fałsz))

Kontakty wiążą konta użytkowników w następujący sposób:  
|numer konta|nr konta-kontaktu|
|---|---|
|1|2|
|2|3|
|3|4|
|4|1|

  
Przeprowadzanie testu:  
- Aktualizacja pola isAccepted dwóch losowo wybranych kontaktów do wartości 1 (prawda).

Spodziewany wynik:
- Powstanie dwóch nowych kontaktów o wartościach w polach userId i contactId zamienionych miejscami w stosunku do wybranych i wartości zawartej w polach isAccepted równej 1 (prawda).
- Zmiana wartości w polach isAccepted wybranych kontaktów do na wartość 1 (prawda).
- Brak zmian w innych polach niż opisane powyżej.
- Brak zmian w nie wybranych kontaktach.

### Ad. 3. Sprawdzenie poprawności działania wyrażeń regularnych na kolumnach phone number i email tabeli Users:  

Sposób przeprowadzenia:  
Automatyczny lub Manualny  
Przygotowanie testu:
- brak

Przeprowadzanie testu:  
- Próba umieszczenia w bazie siedmiu kont użytkowników:
  - konto z pustym ciągiem znaków w polu email
  - konto z pustym ciągiem znaków w polu phoneNumber
  - konto z pustymi ciągami znaków w polach email i phoneNumer
  - konto z ciągiem losowych znaków (co najmniej jeden znak specjalny inny niż . lub @) w polu email
  - konto z ciągiem losowych znaków (co najmniej jeden znak inny niż cyfra 0-9) w polu phoneNumer
  - konto z ciągami losowych znaków, (co najmniej jeden znak inny niż cyfra 0-9) w polu phoneNumer, (co najmniej jeden znak specjalny inny niż . lub @) w polu email
  - konto z prawidłowymi wartościami wszystki pól

Spodziewany wynik:
- Pierwsze sześć prób umieszczenia w bazie nowego konta użytkownika zakończy się niepowodzeniem.
- Siódma próba doprowadzi do umieszczenia w bazie konta użytkownika o parametrach indentycznych z przekazanymi.


## Testy integracyjne
----
Testy integracyjne służą sprawdzeniu wszystkich elementów systemu oraz ich współpracy. Wymagają najwięcej uwagi i zasobów. Opisane poniżej są wybrane przypadki testowe uwzględniające konieczność współdziałania wszystkich elementów systemu.

### Wybrane przypadki testowe
1. Dodawanie użytkownika do kontaktów z poziomu aplikacji klienckiej.
2. Wysyłanie wiadomoście tekstowej do użytkownika z listy kontaktów.
3. Udostępnianie lokalizacji użytkownikowi z listy kontaktów.

### Przygotowanie testów integracyjnych

Stan przed rozpoczęciem każdego testu:  
- Aplikacja kliencka jest uruchomiona i ma połączenie z serwerem. Większość testów wymaga dwóch lub więcej instancji aplikacji klienckiej.
- Serwer działa i ma połączenie z bazą danych.
- Baza danych istnieje i zawiera puste tabele ze zdefiniowanymi relacjami, ograniczeniami, wyzwalaczami oraz procedurami składowymi.
- Istnieje konto użytkownika w systemie zarządzania bazą danych mającego uprawnienia do bazy danych identyczne z uprawnieniami którymi posługuje się serwer produkcyjny.

### Ad.1 Dodawanie użytkownika do kontaktów z poziomu aplikacji klienckiej:
Sposób przeprowadzenia:
Manualny
Przygotowanie testu:
- Utworzenie dwóch kont użytkowników (oznaczonych na czas trwania testu A i B).
- Zalogowanie na dwóch instancjch aplikacji na konta użytkowników A i B.

Przeprowadzenie testu:
- Użytkownik A przechodzi do listy kontaktów
- Użytkownik A naciska przycisk "Dodaj kontakt"
- Użytkownik A wprowadza numer telefonu użytkownika B
- Użytkownik B przechodzi do listy kontaktów
- Użytkownik B naciska przycisk "Zaproszenia"
- Użytkownik B naciska pierwsze widoczne zaproszenie
- Użytkownik B naciska przycisk "Akceptuj"
  
Spodziewany wynik:
- Użytkownik A widzi użytkownika B na liście kontaktów
- Użytkownik B widzi użytkownika A na liście kontaktów
- Lista zaproszeń do kontaktów użytkownika B jest pusta

### Ad.2 Wysyłanie wiadomoście tekstowej do użytkownika z listy kontaktów:
Sposób przeprowadzenia:
Manualny
Przygotowanie testu:
- Utworzenie dwóch kont użytkowników (oznaczonych na czas trwania testu A i B).
- Zalogowanie na dwóch instancjch aplikacji na konta użytkowników A i B.
- Zaproszenie do kontaktów użytkownika B przez użytkownika A.
- Zaakceptowanie zaproszenia przez użytkownika B.

Przeprowadzenie testu:
- Użytkownik A przechodzi do listy kontaktów
- Użytkownik A naciska kontakt z numerem użytkownika B
- Użytkownik A wprowadza treść wiadomości tekstowej w pole tekstowe
- Użytkownik A naciska przycisk "Wyślij"
  
Spodziewany wynik:
- Użytkownik B otrzymuje wiadomość od użytkownika A
- Użytkownik A widzi wysłaną wiadomość
- Pola tekstowe w które użytkownik A wprowadzał wiadomość jest puste

### Ad.3 Udostępnianie lokalizacji użytkownikowi z listy kontaktów:

Sposób przeprowadzenia:
Manualny
Przygotowanie testu:
- Utworzenie dwóch kont użytkowników (oznaczonych na czas trwania testu A i B).
- Zalogowanie na dwóch instancjch aplikacji na konta użytkowników A i B.
- Zaproszenie do kontaktów użytkownika B przez użytkownika A.
- Zaakceptowanie zaproszenia przez użytkownika B.

Przeprowadzenie testu:
- Użytkownik A przechodzi do listy kontaktów
- Użytkownik A naciska kontakt z numerem użytkownika B
- Użytkownik A naciska przełącznik "Udostępnij lokalizację"
  
Spodziewany wynik:
- Użytkownik B widzi lokalizację użytkownika A na liście kontaktów.
- Przełącznik naciśnięty przez użytkownika A wskazuje że lokalizacja jest udostępniana
