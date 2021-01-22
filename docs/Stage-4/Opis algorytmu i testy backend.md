Proces wysyłania wiadomości
--

Użytkownik wysyła infromacje zawierające id kontaktu, zawartość wiadomości oraz jej typ na ścieżkę /message/send korzystając z metody post. Do tych danych powinien być dołączony token umożliwiający autentukację lub w ostateczności numer oraz hasło. System sprawdza zgodność podanych danych (czy istnieje id kontaktu oraz zawiera id użytkownika wysyłajacego wiadomośc, zawartość wiadomości nie jest pusta, podany jest prawidłowy typ wiadomości), a następnie umieszcza je w bazie danych.

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

![](../../images/test_success.png)  

Testy obciążające
--

Dla warstwy logiki zostały przeprowadzone testy obciażające przy użyciu narzędzia [k6](https://k6.io/). Przeprowadzone zostało 10000 zapytań, używając 1000 klientów wirtualnych, wykonujących jednocześnie zapytania. Wyniki testów przedstawione są na grafice poniżej:

![](../../images/test_stress.png)  
