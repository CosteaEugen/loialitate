const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Funcție Firebase care acordă puncte utilizatorului când scanează un cod QR
exports.onQrScan = functions.https.onCall((data, context) => {
  // Verificăm dacă utilizatorul este autentificat
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Trebuie să fii autentificat pentru a scana codurile QR.');
  }

  // Obținem ID-ul utilizatorului curent autentificat
  const userId = context.auth.uid;

  // Verificăm câte puncte are utilizatorul
  return admin.firestore().collection('users').doc(userId).get()
    .then((doc) => {
      if (!doc.exists) {
        throw new functions.https.HttpsError('not-found', 'Utilizatorul nu există în baza de date.');
      }

      // Obținem datele utilizatorului
      const userData = doc.data();
      let points = userData.points || 0;

      // Adăugăm un punct utilizatorului pentru că a scanat un cod QR
      points++;

      // Actualizăm numărul de puncte al utilizatorului în baza de date
      return admin.firestore().collection('users').doc(userId).update({ points: points });
    })
    .then(() => {
      // Returnăm numărul de puncte actualizat
      return { points: points };
    })
    .catch((error) => {
      // Tratăm orice eroare și o aruncăm către client
      throw new functions.https.HttpsError('unknown', error.message);
    });
});
