# Istniejące, funkcjonujące systemy: Signal

## Spis treści

- [Istniejące, funkcjonujące systemy: Signal](#istniejące-funkcjonujące-systemy-signal)
  - [Spis treści](#spis-treści)
  - [Wstęp](#wstęp)
  - [Prywatność](#prywatność)
  - [Możliwości przesyłania treści](#możliwości-przesyłania-treści)
  - [Więcej o lokalizacji](#więcej-o-lokalizacji)
  - [Dostępne klienty](#dostępne-klienty)

## Wstęp

Signal jest otwartoźródłowym komunikatorem skupionym na zachowaniu prywatności użytkowników. Twórcą projektu jest organizacja non-profit Signal Technology Foundation, albo, w skróconej formie, Signal Foundation. Organizacja, oprócz tworzenia oprogramowania, zapewnia serwery potrzebne go korzystania z niego. Zarówno siedziba Signal Foundation jak i serwery znajdują się w Stanach Zjednoczonych.
## Prywatność
Wszystkie przesyłane za pośrednictwem Signal wiadomości, nawet grupowe, są szyfrowane ([szyfrowanie end-to-end](https://en.wikipedia.org/wiki/End-to-end_encryption)) a serwery nie przechowują ich treści w żadnej formie. Aplikacja zbiera absolutne minimum metadanych, w skład których wchodzą mało precyzyjne (z dokładnością do dnia) informacje o dacie ostatniego połączenia klienta z serwerem. Signal przechowuje historię wiadomości tylko lokalnie, w zaszyfrowanym archiwum. W razie potrzeby możliwe jest stworzenie szyfrowanej kopii zapasowej.
## Możliwości przesyłania treści
Komunikator uwzględnia możliwość wysłania różnych treści:  
- wiadomości tekstowe (z możliwością samozniszczenia po określonym czasie od otrzymania ich przez adresata).
- gify oraz naklejki dostarczane przez Giphy.
- wideo (z opcją wysyłania jednorazowych wiadomości)
- zdjęcia (z opcją wysyłania jednorazowych wiadomości)
- obrazki
- pliki
- kontakty
- lokalizacja (w formie adresu oraz odnośnika do pinezki w Google Maps) 
Umożliwa także wykonywanie połączeń głosowych i wideo.
  
## Więcej o lokalizacji
Udostępnianie lokalizacji jest wygodne, jednak nie pozwala na aktualizację położenia telefonu na żywo. Można w tym celu wkorzystać z Google Maps, które pozwalają na udostępnienie linka do mapy pokazującej aktualne położenie telefonu przez dowolny komunikator, jednak funkcja ta nie jest wspierana przez aplikacje (brak podglądu na żywo), co oznacza że adresat będzie musiał otworzyć link w Google Maps albo przeglądarce.

![Udostępnianie lokalizacji](../../images/signal1.png)
   
## Dostępne klienty
Nie istnieje klient webowy, który można znaleźć chociażby w Facebook Messenger. Dostępne są jednak aplikacje na poniższe platformy:  
- Android
- iOS
- Windows
- Mac
- Linux (oficjalne repozytorium z pakietami dla dystrybucji bazujących na Debianie)
- Linux (nieoficjalne pakiety w repozytoriach: Archa i OpenSUSE)
- Linux (nieoficjalne paczki snap i flatpak)
  
Aplikacje klienckie dla Androida i iOS są natywne, podczas gdy pozostałe bazują na frameworku Electron. Twórcy komunikatora nie planują tworzenia klienta w formie aplikacji webowej ze względu na liczne potencjalne podatności oraz fakt, że w wypadku takiej aplikacji niemożliwe jest zapewnienie prawdziwego szyfrowania end-to-end.

![Klient desktopowy](../../images/signal2.png) ![Klient mobilny - Android](../../images/signal3.png)