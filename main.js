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

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PFuyZnzId/model.json', modelLoaded);

function modelLoaded()
{
  console.log('model is loaded');
}

function Speak()
{
  var synth = window.speechSynthesis;
  sd1 = "The first prediction is " + p1;
  sd2 = "and the second prediction is " + p2;
  utterThis = new SpeechSynthesisUtterance(sd1 + sd2);
  synth.speak(utterThis);
}

function check()
{
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
  if(error)
  {
    console.log(error);
  }
  else
  {
    console.log(results);
    p1 = results[0].label;
    p2 = results[1].label;
    document.getElementById('result_emotion_name').innerHTML = p1;
    

    if(p1 == "Thumbs Up")
    {
      document.getElementById('update_emoji').innerHTML = "&#128077";
    }
    if(p1 == "Thumbs Down")
    {
      document.getElementById('update_emoji').innerHTML = "&#128078";
    }
    if(p1 == "Victory")
    {
      document.getElementById('update_emoji').innerHTML = "&#9996";
    }

    speak()
  }
}