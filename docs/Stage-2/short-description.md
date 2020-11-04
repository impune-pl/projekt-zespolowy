# Przedstawienie koncepcji systemu

## Przeznaczenie systemu

Celem powstania systemu jest umożliwienie użytkownikom komunikacji oraz udostępniania lokalizacji za pomocą **aplikacji webowej przystosowanej zarówno do komputerów jak i urządzeń mobilnych**.

## Konta użytkowników

Każde konto w systemie posiada unikalny identyfikator **proponuję użyć nr telefonu żeby było prościej**. Identyfikator ten służy do przesyłania wiadomości, logowania użytkownika oraz odnajdywania użytkowników do dodania do listy znajomych.  
Logowanie na konto wymaga podania hasła. Hasła są przechowywane w formie zasolonego i popieprzonego hasha uzyskanego za pomocą algorytmu Argon2. **Aplikacja obsługuje 2FA za pomocą Google Authenticator.**  
Użytkownik może zmienić hasło do konta. Zmiana hasła odbywa się przez formularz, do którego link jest wysłany na adres email powiązany z kontem. Link jest jednorazowy i wygasa po godzinie od wysłania.

## Mechanizm listy znajomych

Każde konto ma powiązaną listę znajomych. Dodanie użytkownika do listy znajomych wymaga znajomości jego **unikatowy identyfikator** oraz zaakceptowania przez niego prośby o dodanie do znajomych.

## Mechanizm chatu

Aplikacja kliencka umożliwia redagowanie i wysyłanie wiadomości tekstowych do użytkowników z listy znajomych za pośrednictwem serwera. Wiadomości są dostarczane w jak najkrótszym czasie. Po wysłaniu wiadomości adresat **może / powinien** otrzymać powiadomienie push. 

## Mechanizm udostępniania lokalizacji

Aplikacja kliencka aktualizuje lokalizację urządzenia przechowywaną na serwerze kiedy jest uruchomiona (w pięciominutowych odstępach). Serwer umożliwia dostęp do lokalizacji użytkownikom znajdującym się na liście znajomych którzy otrzymali na to zgodę od właściciela konta.