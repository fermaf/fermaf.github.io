// Configurar la cámara web
async function setupWebcam() {
  const video = document.getElementById("webcam");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

// Cargar el modelo
let model;
async function loadModel() {
  //model = await tf.loadGraphModel('URL_DEL_MODELO');
  model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

}

// Detectar personas
async function detectPersons() {
  const video = document.getElementById("webcam");
  const frame = tf.browser.fromPixels(video).resizeNearestNeighbor([224, 224]).toFloat().expandDims(0);

  const predictions = model.predict(frame);

  // Procesar y visualizar los resultados
  displayResults(predictions);

  // Liberar recursos
  frame.dispose();

  // Programar el siguiente fotograma para el análisis
  requestAnimationFrame(detectPersons);
}



// Mostrar resultados
function displayResults(predictions) {
  const resultsElement = document.getElementById("results");
  // Aquí puedes agregar tu lógica para mostrar y gestionar los resultados de la detección de personas.
  // Por ejemplo, puedes crear elementos HTML para mostrar la información de las predicciones.
}

// Iniciar el proceso
(async function() {
  await setupWebcam();
  await loadModel();
  detectPersons();
})();
