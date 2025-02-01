const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

// Cargar imágenes
const playerImage = new Image();
const obstacleImage = new Image();
const backgroundImage = new Image();
const loveCardImage = new Image();

playerImage.src = "../images/girl.png";
obstacleImage.src = "../images/ob-1.png";
backgroundImage.src = "../images/backgroundgame.jpeg";
loveCardImage.src = "../images/lovecard.jpg";

// Variables del juego
let player = { x: 50, y: 280, width: 50, height: 50, vy: 0, isJumping: false, movingToCard: false };
let obstacles = [];
let loveCard = { x: 720, y: 150, width: 40, height: 40, visible: true, floating: true };
let gameTime = 35;
let gameRunning = true;
let finalPhase = false;
let messageShown = false;

// Función para hacer que el jugador salte
function jump() {
    if (!player.isJumping && !player.movingToCard) {
        player.vy = -12;
        player.isJumping = true;
    }
}

// Función para generar obstáculos
function generateObstacle() {
    if (!finalPhase) {
        obstacles.push({ x: canvas.width, y: 300, width: 40, height: 40 });
    }
}

// Mostrar mensaje en pantalla
function showMessage(message, buttonText, callback) {
    const messageBox = document.createElement("div");
    messageBox.style.position = "absolute";
    messageBox.style.top = "50%";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.backgroundColor = "#ffdde1";
    messageBox.style.border = "3px solid #ff7eb3";
    messageBox.style.padding = "20px";
    messageBox.style.textAlign = "center";
    messageBox.style.width = "320px";
    messageBox.style.borderRadius = "15px";
    messageBox.style.boxShadow = "0 0 15px rgba(255, 126, 179, 0.5)";

    const messageText = document.createElement("p");
    messageText.textContent = message;
    messageText.style.color = "#d6336c";
    messageText.style.fontSize = "18px";
    messageText.style.fontWeight = "bold";
    messageBox.appendChild(messageText);

    const button = document.createElement("button");
    button.textContent = buttonText;
    button.style.backgroundColor = "#ff7eb3";
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "10px 15px";
    button.style.marginTop = "10px";
    button.style.borderRadius = "10px";
    button.style.cursor = "pointer";
    button.onclick = () => {
        document.body.removeChild(messageBox);
        callback();
    };
    messageBox.appendChild(button);

    document.body.appendChild(messageBox);
}

// Reiniciar juego
function restartGame() {
    location.reload();
}

// Actualizar juego
function updateGame() {
    if (!gameRunning) return;

    // Gravedad y salto del jugador
    if (!player.movingToCard) {
        player.vy += 0.5;
        player.y += player.vy;
        if (player.y >= 280) {
            player.y = 280;
            player.isJumping = false;
        }
    }

    // Mover obstáculos
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= 5;
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
        }

        // Colisión
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            gameRunning = false;
            showMessage("Inténtalo de nuevo por favor :(, es muy importante, sé que puedes", "Reintentar", restartGame);
        }
    });

    // Mover carta
    if (loveCard.floating) {
        loveCard.y += Math.sin(Date.now() / 300) * 1.5;
    }

    // Fase final
    if (gameTime <= 0 && !finalPhase) {
        finalPhase = true;
        obstacles = [];
        loveCard.x = canvas.width / 2 - loveCard.width / 2;
        loveCard.y = 200;
        player.movingToCard = true;
    }

    // Movimiento automático del personaje hacia la carta
    if (player.movingToCard) {
        if (player.x < loveCard.x - 10) {
            player.x += 2;
        } else {
            player.movingToCard = false;
        }
    }

    // Verificar si el jugador atrapa la carta
    if (
        finalPhase &&
        player.x < loveCard.x + loveCard.width &&
        player.x + player.width > loveCard.x &&
        player.y < loveCard.y + loveCard.height &&
        player.y + player.height > loveCard.y
    ) {
        gameRunning = false;
        showMessage("¡Qué habilidosa, aquí tienes algo que preparé para ti chinita hermosa!", "Continuar", () => {
            window.location.href = "invitation.html";
        });
    }
}

// Dibujar juego
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    obstacles.forEach((obstacle) => {
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
    ctx.drawImage(loveCardImage, loveCard.x, loveCard.y, loveCard.width, loveCard.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.fillText(`Tiempo: ${Math.ceil(gameTime)}`, canvas.width - 120, 30);
}

// Bucle del juego
function gameLoop() {
    if (!gameRunning) return;
    updateGame();
    drawGame();
}

// Iniciar juego
function startGame() {
    setInterval(() => {
        if (gameTime > 0) {
            gameTime--;
        }
    }, 1000);

    setInterval(gameLoop, 1000 / 60);
    setInterval(() => {
        if (gameTime > 0) {
            generateObstacle();
        }
    }, 2000);
}

// Evento para saltar con la tecla de espacio o flecha arriba
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
        jump();
    }
});

// Evento para saltar al tocar la pantalla en dispositivos móviles
document.addEventListener("touchstart", () => {
    jump();
});

startGame();