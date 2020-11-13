# Przedstawienie koncepcji systemu
Informacje zawarte w tym dokumencie mogą się zmieniać w trakcie prac nad projektem.
## Przeznaczenie systemu

Celem powstania systemu jest umożliwienie użytkownikom komunikacji oraz udostępniania lokalizacji za pomocą aplikacji webowej przystosowanej zarówno do komputerów jak i urządzeń mobilnych.

## Konta użytkowników

Każde konto w systemie posiada unikalny identyfikator użytkownika, zwany również nazwą użytkownika. Identyfikator ten służy do przesyłania wiadomości, logowania użytkownika oraz odnajdywania użytkowników do dodania do listy kontaktów.  
Logowanie na konto wymaga podania hasła. Hasła są przechowywane w formie zasolonego i popieprzonego hasha uzyskanego za pomocą algorytmu Argon2.
Użytkownik może zmienić hasło do konta. Zmiana hasła odbywa się przez formularz, do którego link jest wysłany na adres email powiązany z kontem. Link jest jednorazowy i wygasa po godzinie od wysłania.

## Mechanizm autentykacji i zapamiętywania konta
Logowanie odbywa się za pośrednictwem formularza będącego częścią aplikacji klienckiej. Formularz przyjmuje adres email oraz hasło użytkownika, a następnie przesyła je na serwer. Jeśli kombinacja adresu email i hasła jest prawidłowa, serwer w odpowiedzi generuje token o określonym okresie ważności. Token jest następnie przechowywany przez aplikację i używany do potwierdzania tożsamości przy kontakcie z serwerem. Po wygaśnięciu tokenu konieczne jest ponowne zalogowanie się przez użytkownika.

## Mechanizm listy kontaktów

Każde konto ma powiązaną listę kontaktów. Dodanie użytkownika do listy kontaktów wymaga znajomości jego identyfikatora oraz zaakceptowania przez niego prośby o dodanie do kontaktów. Dodanie do kontaktów jest wzajemne (użytkownik A dodając do swoich kontaktów użytkownika B powoduje dodanie siebie do listy kontaktów użytkownika B ze statusem "oczekujący na zaakceptowanie"). Lista kontaktów umożliwia również zablokowanie użytkownika, co spowoduje ignorowanie wszystkich wysyłanych przez niego wiadomości do momentu odblokowania. Umożliwia też odblokowanie użytkownika. Wiadomości wysyłane przez kontakt do momentu odblokowania zostają utracone (nie są przechowywane na serwerze).

## Mechanizm czatu

Aplikacja kliencka umożliwia redagowanie i wysyłanie wiadomości tekstowych. Umożliwia również przesyłanie obrazków znajdujących się w pamięci urządzenia. Wiadomości można przesyłać tylko do użytkowników z listy kontaktów, za pośrednictwem serwera. Wiadomości są zorganizowane w konwersacje. Każda konwersacja odbywa się między dwoma użytkownikami. Serwer przechowuje historię przesyłanych wiadomości, również obrazkowych. Wiadomości są dostarczane do adresatów w jak najkrótszym czasie. Po wysłaniu wiadomości adresat **może / powinien** otrzymać powiadomienie push. 

## Mechanizm udostępniania lokalizacji

Aplikacja kliencka aktualizuje lokalizację urządzenia przechowywaną na serwerze kiedy jest uruchomiona (w minutowych odstępach). Ostatnia znana lokalizacja jest przechowywana na serwerze. Serwer umożliwia dostęp do lokalizacji użytkownikom znajdującym się na liście kontaktów którzy otrzymali na to zgodę od właściciela konta. Lokalizacja jest wyświetlana w aplikacji klienckiej jako pinezka na mapie.

## Interfejs
Interfejs aplikacji klienckiej powinien być podobny do innych znanych komunikatorów oraz aplikacji do wysyłania SMS. Ułatwi to użytkownikom zorientowanie się w nowej aplikacji.  
Minimum wymaganych komponentów lub widoków to:
- Lista kontaktów, służąca jednocześnie jako lista konwersacji. Naciśnięcie na kontakt powinno otwierać widok czatu dla tego kontaktu.
  - Kontakty powinny być opisane w sposób umożliwiający łatwą identyfikację.
  - Kontakt powinien wskazywać czy od ostatniego otwarcia konwersacji pojawiły się nowe wiadomości np. poprzez pogrubienie czcionki lub oznaczenie kolorem.
  - Kontakt powinien wskazywać czy udostępnia użytkownikowi aktualną lokalizację.
- Czat:
  - Przycisk służący do powrotu do listy kontaktów.
  - Lista wiadomości, wiadomości powinny mieć różne kolory i być wyrównane do prawej lub lewej strony ekranu. Posłuży to do zaznaczenia kto wysłał daną wiadomość.
  - Pole tekstowe do tworzenia wiadomości. W aplikacji webowej powinno reagować na naciśnięcie klawisza enter wysłaniem wiadomości, a na naciśnięcie kombinacji shift+enter wstawieniem znaku nowej linii.
  - Przycisk do wysłania wiadomości. Wysyła tekst znajdujący się w polu tekstowym jako nową wiadomość. Jeśli pole tekstowe jest puste lub zawiera jedynie białe znaki, naciśnięcie przycisku nie powoduje wysłania wiadomości.
  - Przycisk będący skrótem do wyboru obrazków do przesłania.
  - Przełącznik udostępniania lokalizacji
  - [Jeśli lokalizacja jest udostępniona] Przycisk otwierający mapę na której jest zaznaczona ostatnia znana serwerowi lokalizacja.

W celu zwiększenia czytelności i zmaksymalizowania dostępnej powierzchni ekranu najlepiej użyć ikon zamiast tekstu do opisu funkcji przycisków.