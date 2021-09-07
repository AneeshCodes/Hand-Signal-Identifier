var p1 = "";
var p2 = "";

Webcam.set({
  width:  350,
  height: 300,
  image_format: 'png',
  png_quality: 90
});

var camera = document.getElementById('camera');

Webcam.attach('#camera');

function takesnapshot()
{
  Webcam.snap(function(data_uri){
    document.getElementById('result').innerHTML = '<img id="captured_image" src="' + data_uri + '">';
  })
}

console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1ob50bhm4/model.json', modelLoaded);

function modelLoaded()
{
  console.log('model is loaded');
}

function Speak()
{
  synth = window.SpeechSynthesis;
  sd1 = "The first prediction is " + p1;
  sd2 = "and the second prediction is " + p2;
  utterThis = new SpeechSynthesisUtterance(sd1 + sd2);
  synth.speak(utterThis);
}

