document.addEventListener("DOMContentLoaded", function() {
  const startScanBtn = document.getElementById("scanButton");
  const qrResultDiv = document.getElementById("qrResult");
  const qrText = document.getElementById("qrText");

  function displayScanResult(result) {
    qrText.textContent = result;
    qrResultDiv.style.display = "block";
  }

  function startScan() {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qrVideo",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText, decodedResult) => {
        console.log(`Code scanned: ${decodedText}`, decodedResult);
        displayScanResult(decodedText);
        html5QrcodeScanner.clear();
      }
    );

    html5QrcodeScanner.render(onScanSuccess);
  }

  startScanBtn.addEventListener("click", startScan);
});
