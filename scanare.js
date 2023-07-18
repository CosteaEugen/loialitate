const scanner = new Html5QrcodeScanner('reader', {
  qrbox: {
    width: 250,
    height: 250,
  },
  fps: 20,
});

scanner.render(success, error);

function success(result) {
  document.getElementById('result').innerHTML = `
    <h2>Scanare reușită!</h2>
    <p><a href="${result}" target="_blank">${result}</a></p>
  `;
  // Aici poți adauga logica pentru acordarea punctelor de loialitate utilizatorului
  // Dacă ai o bază de date sau un serviciu extern pentru gestionarea punctelor, aici poți efectua solicitarea și actualizarea punctelor utilizatorului.

  // Exemplu: dacă rezultatul scanării este valid (îndeplinește anumite condiții), acordă punctele utilizatorului și actualizează interfața cu un mesaj corespunzător sau alte acțiuni necesare.
}

function error(err) {
  console.error(err);
  // Afișează orice eroare în consolă
}
