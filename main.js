Webcam.set({
    width:350,
    height:300,
    ImageFormat:"png",
    pngQuality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function tirarfoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="foto"src="'+data_uri+'"/>';
    });
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/H9dKJIVTH/model.json",modelo);
function modelo(){
    console.log("modelo carregado");
}
function speak(){
    var fala=window.speechSynthesis;
    frase1="A primeira previsão é "+previsao1;
    frase2="A segunda previsão é "+previsao2;
    var falar=new SpeechSynthesisUtterance(frase1+frase2);
    fala.speak(falar);
}
function check(){
    img=document.getElementById('foto');
    classifier.classify(img,resultado);   
}
function resultado(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('resultEmotionName').innerHTML=results[0].label;
        document.getElementById('resultEmotionName2').innerHTML=results[1].label;
        previsao1=results[0].label;
        previsao2=results[1].label;
        speak();
    }
        if(results[0].label=='feliz'){
            document.getElementById('updateEmoji').innerHTML='&#128522;';
        }
        if(results[0].label=='bravo'){
            document.getElementById('updateEmoji').innerHTML='&#128548;';
        }
        if(results[0].label=='triste'){
            document.getElementById('updateEmoji').innerHTML='&#128532;';
        }
        if(results[1].label=='feliz'){
            document.getElementById('updateEmoji2').innerHTML='&#128522;';
        }
        if(results[1].label=='bravo'){
            document.getElementById('updateEmoji2').innerHTML='&#128548;';
        }
        if(results[1].label=='triste'){
            document.getElementById('updateEmoji2').innerHTML='&#128532;';
        }
}