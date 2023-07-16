const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qrResult");
const qrText = document.getElementById("qrText");
const scanButton = document.getElementById("scanButton");

let scanning = false;

// Function to handle camera access permission
function requestCameraPermission() {
  return navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
}

// Function to start scanning
function startScanning() {
  requestCameraPermission()
    .then((stream) => {
      scanning = true;
      qrResult.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
      video.play();
      tick();
    })
    .catch((error) => {
      console.error("Eroare la cererea de permisiune pentru cameră:", error);
      alert("Nu s-a putut obține accesul la cameră. Te rugăm să accepți permisiunea pentru a putea scana codurile QR.");
    });
}

// Set click event for the scan button
scanButton.addEventListener("click", () => {
  if (!scanning) {
    startScanning();
  }
});

// Callback for the QR code scanner
qrcode.callback = (result) => {
  if (result instanceof Error) {
    setTimeout(scan, 300);
  } else {
    scanning = false;
    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });
    qrResult.hidden = false;
    canvasElement.hidden = true;
    qrText.innerText = result;
  }
};

// Function to draw frames on the canvas
function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  if (scanning) {
    requestAnimationFrame(tick);
    qrcode.decode();
  }
}

// Initial call to request camera permission
requestCameraPermission();
