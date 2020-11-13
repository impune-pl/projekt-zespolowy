# Przedstawienie koncepcji systemu

## Przeznaczenie systemu

Celem powstania systemu jest umożliwienie użytkownikom komunikacji oraz udostępniania lokalizacji za pomocą aplikacji webowej przystosowanej zarówno do komputerów jak i urządzeń mobilnych.

## Konta użytkowników

Każde konto w systemie posiada unikalny identyfikator użytkownika, zwany również nazwą użytkownika. Identyfikator ten służy do przesyłania wiadomości, logowania użytkownika oraz odnajdywania użytkowników do dodania do listy kontaktów.  
Logowanie na konto wymaga podania hasła. Hasła są przechowywane w formie zasolonego i popieprzonego hasha uzyskanego za pomocą algorytmu Argon2.
Użytkownik może zmienić hasło do konta. Zmiana hasła odbywa się przez formularz, do którego link jest wysłany na adres email powiązany z kontem. Link jest jednorazowy i wygasa po godzinie od wysłania.

## Mechanizm listy kontaktów

Każde konto ma powiązaną listę kontaktów. Dodanie użytkownika do listy kontaktów wymaga znajomości jego identyfikatora oraz zaakceptowania przez niego prośby o dodanie do kontaktów. Dodanie do kontaktów jest wzajemne (użytkownik A dodając do swoich kontaktów użytkownika B powoduje dodanie siebie do listy kontaktów użytkownika B ze statusem "oczekujący na zaakceptowanie"). Lista kontaktów umożliwia również zablokowanie użytkownika, co spowoduje ignorowanie wszystkich wysyłanych przez niego wiadomości do momentu odblokowania. Umożliwia też odblokowanie użytkownika. Wiadomości wysyłane przez kontakt do momentu odblokowania zostają utracone (nie są przechowywane na serwerze).

## Mechanizm czatu

Aplikacja kliencka umożliwia redagowanie i wysyłanie wiadomości tekstowych. Umożliwia również przesyłanie obrazków znajdujących się w pamięci urządzenia. Wiadomości można przesyłać tylko do użytkowników z listy kontaktów, za pośrednictwem serwera. Wiadomości są zorganizowane w konwersacje. Każda konwersacja odbywa się między dwoma użytkownikami. Serwer przechowuje historię przesyłanych wiadomości, również obrazkowych. Wiadomości są dostarczane do adresatów w jak najkrótszym czasie. Po wysłaniu wiadomości adresat **może / powinien** otrzymać powiadomienie push. 

## Mechanizm udostępniania lokalizacji

Aplikacja kliencka aktualizuje lokalizację urządzenia przechowywaną na serwerze kiedy jest uruchomiona (w minutowych odstępach). Ostatnia znana lokalizacja jest przechowywana na serwerze. Serwer umożliwia dostęp do lokalizacji użytkownikom znajdującym się na liście kontaktów którzy otrzymali na to zgodę od właściciela konta. Lokalizacja jest wyświetlana w aplikacji klienckiej jako pinezka na mapie.

## 