// Importar el modelo COCO-SSD
import * as cocoSsd from '@tensorflow-models/coco-ssd';

// Configurar la cámara web
async function setupWebcam() {
  const video = document.getElementById("webcam");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

// Cargar el modelo
let model;
async function loadModel() {
  model = await cocoSsd.load();
}

// Detectar personas
async function detectPersons() {
  const video = document.getElementById("webcam");
  const predictions = await model.detect(video);

  // Filtrar las predicciones para mostrar solo las personas
  const personPredictions = predictions.filter(prediction => prediction.class === 'person');

  // Procesar y visualizar los resultados
  displayResults(personPredictions);

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
