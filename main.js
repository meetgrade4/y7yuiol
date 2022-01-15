  var previous_result = "";
  var confidence = 0;
  var label = "";

  function setup() {
  canvas = createCanvas(300, 300);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('mobileNet', modelLoaded);
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResults);
  if(mouseIsPressed == true){
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function modelLoaded() {
  console.log('model is loaded');
}



function gotResults(error, result) {
  if(error){
    console.log(error);
  }
  else{
    label = result[0].label;
    confidence = result[0].confidence;
    if(label != previous_result && confidence >= 0.5){
      previous_result = label;
      var synth = window.speechSynthesis;
      var speak_data = "identified object is = to " + label;
      var utterthis = new window.SpeechSynthesisUtterance(speak_data);
      synth.speak(utterthis);
      document.getElementById("Object").innerHTML = label;
      a = math.floor(confidence * 100) + "%";
      console.log(label + " with confidence in decimal of " + a);
      document.getElementById("Accuracy").innerHTML = a;
    }
  }
}

