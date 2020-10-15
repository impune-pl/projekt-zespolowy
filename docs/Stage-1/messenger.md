# Istniejące, funkcjonujące systemy: Messenger
---
### Spis treści

1. [Wstęp](#wstep)
2. [Prywatność](#prywatnosc)
3. [Możliwości przesyłania treści](#mozliwosci-przesylania-tresci)
4. [Więcej o lokalizacji](#wiecej-o-lokalizacji)
5. [Dostępne klienty](#dostepne-klienty)

<a name="wstep"></a>
## Wstęp
![messenger-logo](https://raw.githubusercontent.com/impune-pl/projekt-zespolowy/cubix-docs/images/messenger-logo-128.png "Logo aplikacji Messenger")

Messenger – komunikator internetowy stworzony przez Facebooka. Usługa umożliwia wysyłanie wiadomości tekstowych, wszelkiego rodzaju treści a również realizację połączeń głosowych i wideorozmów także dla większych grup użytkowników. Aplikacja oferuje możliwość szyfrowania wiadomości oraz dostęp do minigier.
Od 2008 r. aplikacja była rozwijana jako Facebook Chat, później oddzielono ją od Facebooka oraz przemianowano na Facebook Messenger. W 2015 r. wprowadzono możliwość korzystania z aplikacji bez posiadania konta w serwisie Facebook, natowmiast w 2019 możliwość ta została usunięta i od tego czasu do kożystania z Messengera wymagane jest konto Facebook.

Komunikacja przez platformę Messenger ma docelowo zostać wprowadzona we wszystkich serwisach Facebook'a, dotąd działal już w:
- Witrynie Facebook
- Portalu Oculus

W niedługim czasie Messenger zostanie wprowadzony jako opcja wysyłania wiadomości w aplikacji [Instagram](https://about.fb.com/news/2020/09/new-messaging-features-for-instagram/)

<a name="prywatnosc"></a>
## Prywatność

Facebook zapewnia że wiadomości wysyłane w Messengerze są jedynie weryfikowane przez zautomatyzowane systemy pod kątem naruszania [standardów społeczności](https://www.facebook.com/communitystandards/). Standardowo treści wysyłane w serwisie są transportowane przez kanał szyfrowany z użyciem SSL, natomiast domyślnie nie są one zabepieczone szyfrowaniem end-to-end.
Messenger oferuje funkcję [poufne rozmowy](https://fbnewsroomus.files.wordpress.com/2016/07/messenger-secret-conversations-technical-whitepaper.pdf) które są szyfrowane z użyciem protokołu [Signal](https://github.com/impune-pl/projekt-zespolowy/blob/therobby-docs/docs/Stage-1/whatsapp.md#prywatno%C5%9B%C4%87), aplikacja używa otwartoźródłowej implementacji `libsignal-protocol-java` na platformie Android oraz `libsignal-protocol-c` na platformie iOS.

<a name="mozliwosci-przesylania-tresci"></a>
## Możliwości przesyłania treści

Messenger umożliwia wysyłanie:
- wiadomości tekstowych (pozwala reagować na wiadomości używając emotikon)
- naklejek (także utworzonych przez użytkownika na bazie własnego wyglądu)
- filmów
- zdjęć
- gifów (także wstawianych z różnych zewnętrznych serwisów)
- różnych plików
- lokalizacji (także w czasie rzeczywistym)
- wiadmomości do [botów udostępnianych przez organizacje](https://developers.facebook.com/products/messenger/)

Konwersacje w serwisie mogą być personalizowane przez uczestników poprzez zmianę pseudonimów, koloru wiadomości, zdjęcia konwersacji etc.
Do aplikacji na bierząco wprowadzane są i usuwane funkcje eksperymentalne jak np. dodawanie animowanych efektów do wiadomości czy tworzenie naklejek selfie.
  
<a name="wiecej-o-lokalizacji"></a>
## Więcej o lokalizacji

Udostępnienie lokalizacji w serwisie jest realizowane poprzez umieszczenie "pinezki" na wbudowanej w aplikacji mapie, adres miejsca jest rozpoznawany i podawany automatycznie. Dostępna jest także funkcja otowrzenia przesłalnej pinezki w innej aplikacji np. [Google Maps](https://maps.google.com) Dodatkowo istnieje też opcja udostępnienia aktualnej lokalizacji przez 60 minut. Nie ma możliwości ustawienia własnego czasu udostępniania lokalizacji. Po upływie tego czasu dane dotyczące udostępniania na żywo nie są dłużej dostępne. 

<a name="dostepne-klienty"></a>
## Dostępne klienty

Serwis jest częścią serwisu Facebook, więc prawie wszystkie jego funkcje są dostępne z poziomu serwisu jako konwersacje w "dymkach", jako chat [Facebook Messages](https://www.facebook.com/messages/) lub poprzez dedykowaną witrynę [Messenger](https://www.messenger.com/). Na bazie webowej wersji oparte jest wiele klientów na pozostałe platformy.

Aplikacja natywna Messenger jest dostępna na poniższe platformy:
- Android
- iOS
- BlackBerry OS
- Windows Phone
- Tizen
- Windows (aplikacja UWP)
- macOS

![messenger-ios](https://www.tabletowo.pl/wp-content/uploads/2018/10/facebook-messenger-4-1.png "Wygląd aplikacji na platformie iOS")
