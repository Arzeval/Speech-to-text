

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
const userlanguage = navigator.language
const buttonrecordingelement = document.getElementById("buttonrecording")
const texarea = document.getElementById("messagefinal")
const iconmicrophone = document.getElementById("iconmicrophone")
let isrecording = false


// Configuration about the recognition
recognition.continuous = false;
recognition.lang = userlanguage;
recognition.interimResults = false;
recognition.maxAlternatives = 1;


buttonrecordingelement.addEventListener('click', function(e) {
    
    e.preventDefault(); 
    if (isrecording == false) {
        recognition.start(); 
        buttonrecordingelement.innerHTML = "Stop Recording";

        iconmicrophone.classList.remove("fill-gray-400")
        iconmicrophone.classList.add("fill-red-500")

        buttonrecordingelement.classList.add("hover:bg-red-500")
        buttonrecordingelement.classList.remove("hover:bg-blue-500")
        isrecording = true
    } else if (isrecording == true) {
        recognition.stop();
        isrecording = false
        buttonrecordingelement.innerHTML = "Start Recording";

        iconmicrophone.classList.add("fill-gray-400")
        iconmicrophone.classList.remove("fill-red-500")

        buttonrecordingelement.classList.remove("hover:bg-red-500")
        buttonrecordingelement.classList.add("hover:bg-blue-500")
    }
   
});

recognition.addEventListener('result', function(e) {
    const result = e.results[0][0].transcript; 
    texarea.textContent = result; 
});