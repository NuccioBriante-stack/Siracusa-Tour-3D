// Definizione della funzione globale per il cambio scena
window.cambiaScena = function(nuovaImmagineId) {
    console.log("Scena cambiata a: " + nuovaImmagineId);
    
    const sky = document.querySelector('#main-sky');
    
    if (sky) {
        // Aggiorna il componente depth-mesh
        sky.setAttribute('depth-mesh', {
            src: nuovaImmagineId,
            type: 'top-bottom',
            displacement: 0.5
        });
    } else {
        console.error("Errore: Elemento #main-sky non trovato!");
    }
};

