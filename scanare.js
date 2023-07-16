document.addEventListener("DOMContentLoaded", function () {
  const qrResultDiv = document.getElementById("qr-result");

  // Funcție pentru a afișa rezultatul scanării
  function displayScanResult(result) {
    qrResultDiv.innerHTML = `
      <p>Cod QR scanat:</p>
      <p><strong>${result}</strong></p>
    `;
  }

  // Funcție pentru a iniția scanarea
  function startScan() {
    // Opțiuni pentru scanarea codului QR
    const hints = new Map();
    hints.set(BarcodeFormat.QR_CODE, {});
    const formats = [BarcodeFormat.QR_CODE];

    // Inițializare obiect Reader pentru scanarea codului QR
    const codeReader = new Html5Qrcode.BrowserMultiFormatReader();

    // Pornirea camerei și scanarea codului QR
    codeReader
      .decodeFromInputVideoDevice(undefined, "qr-reader", formats, hints)
      .then((result) => {
        displayScanResult(result.text);
        codeReader.reset();
      })
      .catch((error) => {
        console.error("Eroare la scanarea codului QR:", error);
        alert("Eroare la scanarea codului QR. Te rugăm să încerci din nou.");
        codeReader.reset();
      });
  }

  // Adaugă evenimentul de click pentru butonul de scanare
  startScan();
});
