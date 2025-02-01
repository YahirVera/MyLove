// Función para generar corazones flotantes
function generateHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartCount = 30; // Número de corazones flotantes

    for (let i = 0; i < heartCount; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️'; // Corazón en formato de emoji

        // Posición aleatoria para cada corazón
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duración aleatoria de la animación
        heart.style.animationDelay = `${Math.random() * 5}s`; // Retraso aleatorio

        heartsContainer.appendChild(heart);
    }
}

// Llamamos a la función para generar los corazones cuando cargue la página
window.onload = generateHearts;

// Acción cuando se presiona el botón de "Empezar"
document.getElementById('start-btn').addEventListener('click', function() {
    window.location.href = "game.html"; // Redirige a la página del juego
});
