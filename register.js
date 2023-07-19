document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passwordField').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Înregistrarea a fost realizată cu succes
      var user = userCredential.user;

      // Creare document nou în colecția "users"
      var db = firebase.firestore();
      var usersRef = db.collection('users');

      var userData = {
        email: user.email,
        displayName: user.displayName,
        // Alte informații despre utilizator pe care doriți să le stocați
      };

      usersRef.doc(user.uid).set(userData)
        .then(function() {
          // Documentul a fost creat cu succes în baza de date
          document.getElementById('message').innerHTML = 'Contul a fost creat cu succes!';
          document.getElementById('registerForm').reset();

          // Redirecționare către pagina de autentificare după înregistrare cu succes
          setTimeout(function() {
            window.location.href = 'login.html';
          }, 2000); // Redirecționează după 2 secunde
        })
        .catch(function(error) {
          // A apărut o eroare la crearea documentului în baza de date
          console.error('Eroare la crearea documentului în baza de date:', error);
          document.getElementById('message').innerHTML = 'A apărut o eroare la înregistrare: ' + error.message;
        });
    })
    .catch(function(error) {
      // A apărut o eroare la înregistrare
      console.error('Eroare la înregistrare:', error);
      document.getElementById('message').innerHTML = 'A apărut o eroare la înregistrare: ' + error.message;
    });
});
const registerForm = document.getElementById('registerForm');
const nameField = document.getElementById('nameField');
const emailField = document.getElementById('emailField');
const passwordField = document.getElementById('passwordField');
const message = document.getElementById('message');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameField.value;
  const email = emailField.value;
  const password = passwordField.value;

  // Înregistrarea utilizatorului prin email și parola
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Obținem utilizatorul creat
      const user = userCredential.user;

      // Adăugăm numele în baza de date
      return firebase.firestore().collection('users').doc(user.uid).set({
        name: name,
        points: 0,
        scannedPoints: 0,
        qrCodeValue: generateQRCodeValue(),
      });
    })
    .then(() => {
      // Autentificare cu succes - redirecționează utilizatorul către pagina principală
      window.location.href = 'pagina_principala.html';
    })
    .catch((error) => {
      // Eroare la înregistrare - afișează mesajul de eroare corespunzător sau alte acțiuni necesare
      console.error('Eroare la înregistrare:', error);
    });
});
// Obținem elementul iconiței pentru afișarea/ascunderea parolei
const togglePassword = document.getElementById('togglePassword');

// Adăugăm evenimentul de click pe iconiță
togglePassword.addEventListener('click', () => {
  const passwordField = document.getElementById('passwordField');
  // Verificăm starea câmpului de parolă
  if (passwordField.type === 'password') {
    // Dacă parola este ascunsă, o afișăm
    passwordField.type = 'text';
    togglePassword.classList.remove('fa-eye');
    togglePassword.classList.add('fa-eye-slash');
  } else {
    // Dacă parola este afișată, o ascundem
    passwordField.type = 'password';
    togglePassword.classList.remove('fa-eye-slash');
    togglePassword.classList.add('fa-eye');
  }
});
