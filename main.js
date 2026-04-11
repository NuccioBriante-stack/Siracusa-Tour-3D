// Funzione per cambiare la scena mantenendo l'effetto 3D
function cambiaScena(nuovaImmagineId) {
  const sky = document.querySelector('#main-sky');
  // Aggiorniamo il componente depth-mesh con la nuova immagine
  sky.setAttribute('depth-mesh', 'src', nuovaImmagineId);
}
    
    console.log("Scena cambiata a: " + nuovaImmagineId);
}
