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
    // Asegúrate de haber cargado el modelo de MobileNet previamente
    const input = tf.browser.fromPixels(video);
    const resizedInput = tf.image.resizeBilinear(input, [224, 224]);
    const normalizedInput = resizedInput.div(tf.scalar(255));

    // Ejecuta la inferencia usando la función 'predict'
    const prediction = model.predict(normalizedInput);

    // Procesa los resultados de la predicción aquí
    // ...

    // Limpia los tensores intermedios
    input.dispose();
    resizedInput.dispose();
    normalizedInput.dispose();
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
