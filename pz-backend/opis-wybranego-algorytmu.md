Proces wysyłania wiadomości
--

Użytkownik wysyła infromacje zawierające id kontaktu, zawartość wiadomości oraz jej typ na ścieżkę /message/send korzystając z metody post. Do tych danych powinien być dołączony token umożliwiający autentukację lub w ostateczności numer oraz hasło. System sprawdza zgodność podanych danych (czy istnieje id kontaktu oraz zawiera id użytkownika wysyłajacego wiadomośc, zawartość wiadomości nie jest pusta, podany jest prawidłowy typ wiadomości), a następnie umieszcza je w bazie danych.
