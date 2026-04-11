// Funzione globale per il cambio scena
window.cambiaScena = function(idNuovaFoto) {
    console.log("Cambio scena verso: " + idNuovaFoto);
    
    var sky = document.querySelector('#main-sky');
    
    if (sky) {
        // Aggiorna il componente depth-mesh con i parametri necessari
        sky.setAttribute('depth-mesh', {
            src: idNuovaFoto,
            type: 'top-bottom',
            displacement: 0.5
        });
    } else {
        console.error("Elemento #main-sky non trovato!");
    }
};
