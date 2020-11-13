# Model Architektury systemu
---
### Spis treści

1. [Diagram Architektury](#diagram)
2. [Opis i uzasadnienie](#opis)

<a name="diagram"></a>
## Diargam Architektury 

![diagram-architektury](https://raw.githubusercontent.com/impune-pl/projekt-zespolowy/cubix-docs/images/pz_diagram_architektury.png "Diagram Architektury")


<a name="opis"></a>
## Opis i uzasadnienie

Do realizacji systemu został wybrany model trójwarstwowy, przygotowany pod aplikację internetową. 

Za przechowywanie danych odpowiada relacyjna baza danych, w której przechowywane będą wszystkie informacje generowane przez system, oraz inne dane konfiguracyjne. Zgodnie z przygotowanym [modelem danych](https://github.com/impune-pl/projekt-zespolowy/blob/main/docs/Stage-2/data-model-description.md).

Drugą warstwą jest logika aplikacji, odpowiada za nią aplikacja uruchomiona na serwerze. Jej rolą rest komunikacja z bazą danych oraz realizacja żądań wywoływanych z interfejsu użytkownika. Komunikacja z interfejesem realizowana jest poprzez API w celu ujednolicenia i ułatwienia komunikacji w systemie.

Trzecią i ostatnią warstwą jest sam interfejs użytkownika, jest to komponent systemu działający na urządzeniu użytkownika. Jego zadaniem jest udostępnienie funkcjonalności oferowanych przez system oraz pobieranie od użytkownika wszelkich niezbędnych informacji i przekazywanie ich do drugiej warstwy systemu.

Taki podział architektury aplikacji został opracowany w celu rozdzielenia prezentacji od logiki i przechowywania danych. Zapewni to większą elastyczność systemu i ułatwi jego tworzenie jak i późniejszy rozwój i wprowadzanie aktualizacji. Dodatkowym atutem takiego podziału jest przydiał zadań, za realizację pojedynczej warstwy odpowiada jeden członek zespołu. W realizacji zepół będzie oczywiście współpracować w poszczegolnych zadaniach.