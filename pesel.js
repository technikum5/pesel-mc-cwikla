<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sprawdzenie PESEL</title>
    <style>
        label, p {
            font-size: 1.2em;
            
        }
      
        
        input {
            padding: 5px;
            font-size: 1.5em;
            
        }
        
    </style>
</head>
<body>

    <h2>Sprawdź numer PESEL</h2>
    
    <label for="pesel">Podaj numer PESEL: </label>
    <input type="text" id="pesel" maxlength="11" placeholder="np. 44051401359">
    <button onclick="sprawdzPESEL()">Sprawdź</button>

    <div id="wyniki">
        <p id="wynik-rok"></p>
        <p id="wynik-miesiac"></p>
        <p id="wynik-dzien"></p>
        <p id="wynik-plec"></p>
        <p id="wynik-valid"></p>
    </div>

    <script>
        function sprawdzPESEL() {
            const pesel = document.getElementById("pesel").value.trim();

            // dlugosc pesela numer
            if (pesel.length !== 11) {
                document.getElementById("wynik-valid").innerHTML = "Numer PESEL musi mieć 11 cyfr!";
                return;
            }

            // Spradzanie czy sa cyframi
            if (!/^\d+$/.test(pesel)) {
                document.getElementById("wynik-valid").innerHTML = "PESEL może zawierać tylko cyfry!";
                return;
            }

            // Sprawdzanie poprawności sumy kontrolnej PESEL
            if (!sprawdzSumeKontrolna(pesel)) {
                document.getElementById("wynik-valid").innerHTML = "Numer PESEL jest nieprawidłowy!";
                return;
            }

            // Wyciąganie danych z PESEL
            const rok = getRok(pesel);
            const miesiac = getMiesiac(pesel);
            const dzien = pesel.substring(4, 6); // Dzień to cyfry od 4 do 6 w PESEL
            const plec = getPlec(pesel);

            document.getElementById("wynik-rok").innerHTML = `Rok urodzenia: ${rok}`;
            document.getElementById("wynik-miesiac").innerHTML = `Miesiąc urodzenia: ${miesiac}`;
            document.getElementById("wynik-dzien").innerHTML = `Dzień urodzenia: ${dzien}`;
            document.getElementById("wynik-plec").innerHTML = `Płeć: ${plec}`;
            document.getElementById("wynik-valid").innerHTML = "Numer PESEL jest prawidłowy!";
        }

        // Funkcja sprawdzająca sumę kontrolną PESEL
        function sprawdzSumeKontrolna(pesel) {
            const wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            let suma = 0;
            for (let i = 0; i < 10; i++) {
                suma += parseInt(pesel.charAt(i)) * wagi[i];
            }
            const kontrolna = (10 - (suma % 10)) % 10;
            return kontrolna === parseInt(pesel.charAt(10));
        }

        // Funkcja wyciągająca rok z PESEL
        function getRok(pesel) {
            const rok = pesel.substring(0, 2);
            const miesiac = parseInt(pesel.substring(2, 4));

            // Dekodowanie roku na podstawie miesiąca
            if (miesiac >= 1 && miesiac <= 12) {
                return "19" + rok;
            } else if (miesiac >= 21 && miesiac <= 32) {
                return "20" + rok;
            } else if (miesiac >= 41 && miesiac <= 52) {
                return "21" + rok;
            } else if (miesiac >= 61 && miesiac <= 72) {
                return "22" + rok;
            } else if (miesiac >= 81 && miesiac <= 92) {
                return "23" + rok;
            } else {
                return "Niepoprawny miesiąc";
            }
        }

        // Funkcja wyciągająca nazwę miesiąca z PESEL
        function getMiesiac(pesel) {
            const miesiace = [
                "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
                "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
            ];
            const miesiac = parseInt(pesel.substring(2, 4)) % 20;
            return miesiace[miesiac - 1];
        }

    
        function getPlec(pesel) {
            const dziesiataCyfra = parseInt(pesel.charAt(9));
            return dziesiataCyfra % 2 === 0 ? "Kobieta" : "Mężczyzna";
        }
    </script>

</body>
</html>
