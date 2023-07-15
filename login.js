const loginForm = document.getElementById('loginForm');
const emailField = document.getElementById('emailField');
const passwordField = document.getElementById('passwordField');
const message = document.getElementById('message');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailField.value;
  const password = passwordField.value;

  if (email === 'costea_gen@yahoo.com' && password === 'Maktesz333') {
    // Autentificare cu succes pentru utilizatorul specific - redirecționează către pagina de scanare
    window.location.href = 'scanare.html';
  } else {
    // Autentificare utilizând Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Autentificare cu succes - redirecționează utilizatorul către pagina principală
        window.location.href = 'pagina_principala.html';
      })
      .catch((error) => {
        // Eroare la autentificare - afișează mesajul de eroare corespunzător sau alte acțiuni necesare
        console.error('Eroare la autentificare:', error);
      });
  }
});
