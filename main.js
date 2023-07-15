const qrCodeValue = 'valoarea_unica_a_codului_qr';

// Adaugă un document nou în colecția "coduri_qr"
db.collection('coduri_qr').doc(qrCodeValue).set({
  qrCodeValue: qrCodeValue,
  // Alte proprietăți asociate cu codul QR
})
.then(() => {
  console.log('Codul QR a fost salvat cu succes în Firestore');
})
.catch((error) => {
  console.error('Eroare la salvarea codului QR în Firestore:', error);
});

let scanCount = 0;
addPointsToDatabase(points);

function addPointsToDatabase(points) {
  // Obțineți referința la colecția "users" în baza de date Firestore
  const usersCollection = firebase.firestore().collection("users");

  // Obțineți utilizatorul curent autentificat
  const currentUser = firebase.auth().currentUser;

  if (currentUser) {
    // Obțineți ID-ul utilizatorului curent
    const userId = currentUser.uid;

    // Actualizați documentul utilizatorului cu numărul de puncte
    usersCollection.doc(userId).update({ points: points })
      .then(() => {
        console.log("Punctele au fost adăugate în baza de date Firebase.");
      })
      .catch((error) => {
        console.error("A apărut o eroare la adăugarea punctelor în baza de date Firebase:", error);
      });
  }
}
// Importați modulul de autentificare Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";

// ...

// Funcția pentru înregistrarea unui nou utilizator
function registerNewUser(email, password) {
  // Creați utilizatorul în sistemul de autentificare Firebase
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Obțineți ID-ul utilizatorului creat
      const userId = userCredential.user.uid;

      // Actualizați documentul utilizatorului în Firestore
      db.collection("users").doc(userId).update({
        // Proprietăți ale utilizatorului pe care doriți să le actualizați
      })
      .then(() => {
        console.log("Documentul utilizatorului a fost actualizat cu succes în Firestore");
      })
      .catch((error) => {
        console.error("Eroare la actualizarea documentului utilizatorului în Firestore:", error);
      });
    })
    .catch((error) => {
      console.error("Eroare la înregistrarea unui nou utilizator:", error);
    });
}

// Apelați funcția de înregistrare a unui nou utilizator cu adresa de email și parola
registerNewUser("exemplu@email.com", "parolasecreta");
