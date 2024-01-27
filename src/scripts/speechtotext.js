

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
const userlanguage = navigator.language
const buttonrecordingelement = document.getElementById("buttonrecording")
const texarea = document.getElementById("messagefinal")
const iconmicrophone = document.getElementById("iconmicrophone")
let isrecording = false


// Configuration about the recognition
recognition.continuous = true;
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
     Translate(result)
    
    buttonrecordingelement.innerHTML = "Start Recording";

    buttonrecordingelement.classList.remove("hover:bg-red-500")
    buttonrecordingelement.classList.add("hover:bg-blue-500")

    iconmicrophone.classList.add("fill-gray-400")
    iconmicrophone.classList.remove("fill-red-500")
    isrecording = false
});

async function Translate(text) {
    try {
        let sourceLang = navigator.language;  // Define el idioma de origen
        let selectedLanguage = document.getElementById('TargetLanguage').value;
       
        // Crea la URL de la API
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + selectedLanguage + "&dt=t&q=" + encodeURI(text);

        // Realiza la llamada a la API
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }

        // Obtiene la respuesta de la API
        let data = await response.json();
        let translatedText = data[0][0][0];

      

        // Inserta el texto traducido en el elemento
        const elementoMensaje = document.querySelector('.mensaje');
        texarea.textContent = translatedText;
    } catch (error) {
        console.error('Error al traducir el texto:', error);
    }
}