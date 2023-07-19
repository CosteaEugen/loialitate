const firebaseAdmin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Schimbă calea cu locația fișierului serviceAccountKey.json

// Inițializează aplicația Firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://web-royalty-card-default-rtdb.europe-west1.firebasedatabase.app' // Schimbă cu URL-ul bazei de date Firebase
});

const app = express();
const port = 3000;

// Middleware pentru a permite primirea datelor în format JSON
app.use(bodyParser.json());

// Ruta pentru gestionarea cererilor de scanare
app.post('/scan', (req, res) => {
  const { userId, qrCodeValue } = req.body;

  // Aici adaugăm logica pentru acordarea punctelor în funcție de qrCodeValue și userId, utilizând baza de date Firebase
  if (qrCodeValue === 'reducere10lei' || qrCodeValue === 'spalareGratis') {
    // Verificăm dacă qrCodeValue corespunde unui QR code cu ofertă
    const offerType = qrCodeValue === 'reducere10lei' ? '10lei' : 'spalareGratis';

    // Dacă utilizatorul are suficiente puncte pentru a revendica oferta
    if (userHasEnoughPoints(userId, offerType)) {
      // Acordăm oferta și actualizăm punctele utilizatorului în baza de date
      giveOfferToUser(userId, offerType);

      // Răspuns cu status 200 pentru a indica succesul acordării punctelor și revendicării ofertei
      res.status(200).json({ message: `Oferta "${offerType}" a fost revendicată cu succes!` });
    } else {
      // Răspuns cu status 403 (Forbidden) dacă utilizatorul nu are suficiente puncte pentru a revendica oferta
      res.status(403).json({ error: 'Nu ai suficiente puncte pentru a revendica această ofertă.' });
    }
  } else {
    // Dacă qrCodeValue nu corespunde unui QR code cu ofertă, acordăm un punct utilizatorului
    givePointToUser(userId);

    // Răspuns cu status 200 pentru a indica succesul acordării punctului
    res.status(200).json({ message: 'Punct acordat cu succes!' });
  }
});

// Funcție pentru a acorda un punct utilizatorului
function givePointToUser(userId) {
  // Aici poți adăuga logica pentru a acorda un punct utilizatorului în baza de date Firebase
  // De exemplu, poți actualiza un câmp "puncte" în documentul utilizatorului cu id-ul userId, incrementându-l cu 1
}

// Funcție pentru a verifica dacă utilizatorul are suficiente puncte pentru a revendica o ofertă
function userHasEnoughPoints(userId, offerType) {
  // Aici poți adăuga logica pentru a verifica dacă utilizatorul are suficiente puncte pentru a revendica oferta
  // De exemplu, poți citi valoarea câmpului "puncte" din documentul utilizatorului cu id-ul userId și compara cu numărul de puncte necesare pentru revendicare (4 puncte sau 7 puncte)
  // Returnează true dacă utilizatorul are suficiente puncte, altfel returnează false
}

// Funcție pentru a acorda o ofertă utilizatorului
function giveOfferToUser(userId, offerType) {
  // Aici poți adăuga logica pentru a acorda oferta utilizatorului
  // De exemplu, poți actualiza un câmp "oferte" în documentul utilizatorului cu id-ul userId pentru a marca că utilizatorul a revendicat oferta
  // După acordarea ofertei, actualizează și câmpul "puncte" în baza de date, resetând numărul de puncte al utilizatorului la 0
}

// Pornirea serverului
app.listen(port, () => {
  console.log(`Serverul rulează pe http://localhost:${port}`);
});
