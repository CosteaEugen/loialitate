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
