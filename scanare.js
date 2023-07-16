const video = document.getElementById('qr-video');
const qrResult = document.getElementById('qr-result');
const outputData = document.getElementById('outputData');

let scanner;

// Funcție pentru a iniția scanarea
function startScan() {
  qrResult.hidden = true;

  // Verificăm dacă browser-ul suportă funcția mediaDevices.getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Obținem permisiunea pentru cameră
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(function (stream) {
        // Permisiunea pentru cameră a fost acordată
        video.srcObject = stream;
        scanner.start(video);
      })
      .catch(function (error) {
        // A apărut o eroare la cererea de permisiune pentru cameră
        console.error('Eroare la cererea de permisiune pentru cameră:', error);
      });
  } else {
    console.error('Navigatorul nu suportă mediaDevices.getUserMedia.');
  }
}

// Inițializare scanner
document.addEventListener('DOMContentLoaded', () => {
  scanner = new Instascan.Scanner({ video: video });

  scanner.addListener('scan', function (content) {
    // S-a găsit un cod QR
    console.log('QR code scanned:', content);
    outputData.innerText = content;
    qrResult.hidden = false;
    scanner.stop();
  });

  Instascan.Camera.getCameras()
    .then(function (cameras) {
      if (cameras.length > 0) {
        // Setează camera frontală ca opțiune implicită
        startScan();
      } else {
        console.error('Nu există camere disponibile.');
      }
    })
    .catch(function (error) {
      console.error('Eroare la obținerea camerelor:', error);
    });
});
