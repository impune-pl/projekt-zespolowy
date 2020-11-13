# Opis modelu danych

Informacje zawarte w tym dokumencie mogą się zmieniać w czasie prac nad projektem.
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
3. Konwersacje - tabela ułatwiająca znalezienie wiadomości wymienianych między dwoma użytkownikami.
4. Wiadomości - tabela zawierająca wiadomości wymieniane w ramach konwersacji.
5. Tokeny - tabela przechowująca tokeny logowania oraz metadane ich dotyczące.

## Identyfikacja relacji między tabelami w bazie i ich rodzajów
Liczby w pierwszym wierszu i w pierwszej kolumnie odpowiadają numerom którymi oznaczono tabele w poprzedniej sekcji.  
Możliwe rodzaje relacji to:
- 1:1 - relacja jeden do jednego
- 1:W - relacja jeden do wielu
- W:1 - relacja wiele do jednego
- W:W - relacja wiele do wielu

|   | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
|1  | - |1:W|1:W|1:W|1:W|
|2  |W:1| - | - | - | - |
|3  |W:1| - | - |1:W| - |
|4  |W:1| - |W:1| - | - |
|5  |W:1| - | - | - | - |

  
## Projekt bazy danych
Wstępny projekt bazy danych obrazujący relacje między tabelami oraz kolumny znajdujące się w tabelach jest widoczny na poniższym obrazku. 
![Projekt bazy](../../images/db-schema.png)