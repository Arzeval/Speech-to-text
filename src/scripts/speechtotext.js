

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
    if (isrecording == false) { // If it is not recording then I proceed to compile and modify css styles.
        recognition.start(); 
        buttonrecordingelement.innerHTML = "Stop Recording";

        iconmicrophone.classList.remove("fill-gray-400")
        iconmicrophone.classList.add("fill-red-500")

        buttonrecordingelement.classList.add("hover:bg-red-500")
        buttonrecordingelement.classList.remove("hover:bg-blue-500")
        isrecording = true
    } else if (isrecording == true) { // Stop recording and remodify values
        recognition.stop();
        isrecording = false
        buttonrecordingelement.innerHTML = "Start Recording";

        iconmicrophone.classList.add("fill-gray-400")
        iconmicrophone.classList.remove("fill-red-500")

        buttonrecordingelement.classList.remove("hover:bg-red-500")
        buttonrecordingelement.classList.add("hover:bg-blue-500")
    }
   
});

recognition.addEventListener('result', function(e) { // Result of the audio compilation in which I send it to write and modify the values since the API itself can stop if it stops receiving audio (It can happen).
    const result = e.results[0][0].transcript; 
    recognition.stop();
     Translate(result)
    
    buttonrecordingelement.innerHTML = "Start Recording";

    buttonrecordingelement.classList.remove("hover:bg-red-500")
    buttonrecordingelement.classList.add("hover:bg-blue-500")

    iconmicrophone.classList.add("fill-gray-400")
    iconmicrophone.classList.remove("fill-red-500")
    isrecording = false
});

async function Translate(text) { //Get the language of the browser to start as a base (I assume that it speaks the same language as the one in which Chrome is set) and it returns a response by entering
    try {
        let sourceLang = navigator.language;  
        let selectedLanguage = document.getElementById('TargetLanguage').value;
       
        
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + selectedLanguage + "&dt=t&q=" + encodeURI(text);

      
        let response = await fetch(url);
        if (!response.ok) {
            throw alert("An error occurred, try again later.");
        }

        
        let data = await response.json();
        let translatedText = data[0][0][0];

      

     
        
        texarea.textContent = translatedText;
    } catch (error) {
        alert("An error occurred, try again later.")
    }
}