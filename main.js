const SpeechRecognition = webkitSpeechRecognition;
const recFala = new SpeechRecognition();

const camera = document.getElementById("camera");

inicializar();
function inicializar() {
  Webcam.set({
    width: 400,
    height: 300,
    image_format: "png",
    png_quality: 90,
  });
  //Webcam.attach(camera);
  recFala.lang = "pt-BR"
  recFala.onresult = resultadoFala
}

function iniciaMic() {
    recFala.start();
    document.getElementById("txtFala").value = "";
}

function resultadoFala(e) {
    //console.log(e);//
    const fala = e.results[0][0].transcript
    console.log(fala);
    document.getElementById("txtFala").value = fala;
    //faleIsto(fala);
    if(fala.toLowerCase().includes("tire minha selfie")) {
       Webcam.attach(camera);
       faleIsto("Tirando selfie em 5 segundos");
       setTimeout(selfie,5000)
    }
}

function faleIsto(textoFala) {
  const synth = speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(textoFala)
  synth.speak(utterThis)
}

function selfie() {
  Webcam.snap((dataBase64) => {
    console.log(dataBase64)
    const ibagem = new Image();
    ibagem.src = dataBase64;
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").appendChild(ibagem)
  })
}