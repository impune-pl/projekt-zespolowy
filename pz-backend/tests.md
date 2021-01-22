Testy poszczególnych modułów
--

Testy zostały wykonane dla poszczególnych przypadków:
- prawidłowe przesłanie pliku html /
- logowanie z prawidłowymi danymi
- logowanie z nieprawidłowymi danymi
- rejestracja z prawidłowymi danymi
- rejestracja z nieprawidłowymi danymi
- wysyłanie wiadomości z prawidłowymi danymi
- wysyłanie wiadomości ze żle podanym id kontaku
- wysyłanie wiadomości ze żle podanym id typu
- wysyłanie wiadomości z pustą wiadomością
- sprawdzenie nowych wiadomości z danymi zakładającymi isnienie nowszych wiadomości
- sprawdzenie nowych wiadomości z danymi nie zakładającymi isnienia nowszych wiadomości

Wyniki zostały przeprowadzone automatycznie z pomocą biblioteki [supertest](https://github.com/visionmedia/supertest). Testy przeszły prawidłowo, na co wskazuje informacja po ich ukończeniu

![](../images/test_success.png)  
