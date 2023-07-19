// app.js
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

  // Aici poți adauga logica pentru acordarea punctelor în funcție de qrCodeValue și userId, utilizând baza de date Firebase
  // De exemplu, poți actualiza o colecție în baza de date Firebase pentru utilizatorul cu id-ul userId, adăugând un punct în cazul în care qrCodeValue este valabil.

  // În final, trimite un răspuns cu status 200 pentru a indica succesul acordării punctelor
  res.status(200).json({ message: 'Punct acordat cu succes!' });
});

// Pornirea serverului
app.listen(port, () => {
  console.log(`Serverul rulează pe http://localhost:${port}`);
});
