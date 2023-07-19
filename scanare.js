// Funcție pentru a redirecționa către pagina de autentificare
function redirectToLoginPage() {
  window.location.href = 'login.html';
}

// Inițializarea Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Verificăm dacă utilizatorul este autentificat
auth.onAuthStateChanged((user) => {
  if (user) {
    // Utilizatorul este autentificat, putem începe scanarea
    initQRCodeScanner(user);
  } else {
    // Utilizatorul nu este autentificat, ascundem containerul pentru scanare
    document.getElementById('reader').style.display = 'none';
    // Arătăm butonul de autentificare
    document.getElementsByTagName('button')[0].style.display = 'block';
  }
});

// Funcția pentru a trata evenimentul de detectare a unui cod QR
const onScanSuccess = (qrCodeMessage) => {
  document.getElementById('result').innerText = qrCodeMessage;
  updatePointsInDatabase(auth.currentUser, qrCodeMessage);
};

// Funcția care inițializează scannerul de coduri QR
function initQRCodeScanner(user) {
  const html5QrCodeScanner = new Html5QrcodeScanner(
    'reader', { fps: 10, qrbox: 250 });

  // Setăm funcția de tratare a evenimentului de detectare a codului QR
  html5QrCodeScanner.render(onScanSuccess);
}

// Funcția pentru actualizarea punctelor în baza de date
function updatePointsInDatabase(user, qrCodeMessage) {
  // Verificăm dacă utilizatorul există în baza de date
  const userRef = db.collection('users').doc(user.uid);
  userRef.get().then((doc) => {
    if (doc.exists) {
      const userData = doc.data();
      let points = userData.points || 0;
      points++;

      // Actualizăm numărul de puncte al utilizatorului în baza de date
      userRef.update({ points: points }).then(() => {
        // Afisăm mesajul de succes
        console.log(`Numărul de puncte actualizat: ${points}`);
      }).catch((error) => {
        console.error('Eroare la actualizarea punctelor:', error);
      });
    } else {
      console.error('Utilizatorul nu există în baza de date.');
    }
  }).catch((error) => {
    console.error('Eroare la obținerea datelor utilizatorului:', error);
  });
}
