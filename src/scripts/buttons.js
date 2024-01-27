
const copybutton = document.getElementById("copy")
const clearbutton = document.getElementById("clear")
copybutton.addEventListener('click', function(e) {
    
    e.preventDefault(); 
    messagefinal.select();
    document.execCommand("copy");
   
});

clearbutton.addEventListener('click', function(e) {
    
    e.preventDefault(); 
    messagefinal.value = "";
   
});

