# Opis modelu danych

## Identyfikacja obiektów w systemie

Na podstawie opisu sytemu oraz specyfikacji można zidentyfikować następujące obiekty:  
- Użytkownik
- Wiadomość
- Konwersacja
- Lista kontaktów
- Kontakt
- Token logowania

## Odwzorowanie obiektów na encje
Nie wszystkie obiekty muszą znaleźć się w bazie danych. Na przykład lista kontaktów może zostać przchowana jako pojedyncze kontakty w relacji wiele do jednego do użytkownika.

## Tabele w bazie danych 

Na podstawie obiektów w systemie zidentyfikowane zostały nasępujące tabele:
1. Użytkownicy - tabela zawierająca informacje potrzebne do identyfikacji i autentykacji użytkownika w systemie
2. Kontakty - tabela zawierające informacje o powiązaniach między użytkownikami w ramach listy kontaktów.
3. Wiadomości - tabela zawierająca wiadomości wymieniane w ramach konwersacji.
4. Tokeny - tabela przechowująca tokeny logowania oraz metadane ich dotyczące.
5. Rodzaje wiadomości - tabela przechowująca rodzaje wiadomości.

## Identyfikacja relacji między tabelami w bazie i ich rodzajów
Liczby w pierwszym wierszu i w pierwszej kolumnie odpowiadają numerom którymi oznaczono tabele w poprzedniej sekcji. Tabelę należy czytać wg. formuły [Wiersz][Relacja][Kolumna].
Możliwe rodzaje relacji to:
- 1:1 - relacja jeden do jednego
- 1:W - relacja jeden do wielu
- W:1 - relacja wiele do jednego
- W:W - relacja wiele do wielu

|   | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| 1 |   |1:W|   |1:W|   |
| 2 |W:1|   |1:W|   |   |
| 3 |   |W:1|   |   |W:1|
| 4 |W:1|   |   |   |   |
| 5 |   |   |1:W|   |   |
  
  
## Projekt bazy danych
Wstępny projekt bazy danych obrazujący relacje między tabelami oraz kolumny znajdujące się w tabelach jest widoczny na poniższym obrazku. 
![Projekt bazy](../../images/db-schema.png)