const messages = [
    "Fuiste mi primer beso romántico.",
    "Fuiste mi primer beso bajo la lluvia.",
    "Fuiste mi primera ilusión y amor de colegio.",
    "Me encantan tus ojos chinitos.",
    "Me gusta ese par de grandes razones ( 😉 ).",
    "Saray, yo te he dicho todo lo que siento y todo lo que representas para mi, volverte a encontrar luego de 10 años y poder tenerte a mi lado me llena el corazón de una manera en la que no tienes idea, tú sabes que me gustas, sabes que me encantas y que quiero muchas cosas contigo. Yo sé que aquel primer beso bajo la lluvia en la noche nos unió de alguna manera y aunque estuvimos mucho tiempo desviados ahora estás aqui y no sé si sea la suerte o el destino solo sé que quiero intentar algo serio y bonito contigo por lo que presiona el botón de abajo",
    "Chinita guapetona, ¿quisieras ser mi San Valentín?"
];

let currentIndex = 0;

function nextMessage() {
    const letterText = document.getElementById("letter-text");
    if (currentIndex < messages.length) {
        letterText.textContent = messages[currentIndex];
        currentIndex++;
    } else {
        document.querySelector(".letter-content").innerHTML = `
            <p>Chinita guapetona, ¿quisieras ser mi San Valentín?</p>
            <button onclick="showPopup('Sí')">Sí</button>
            <button id="no-button" onclick="showPopup('No')">No</button>
        `;
    }
}

const noResponses = [
    "Piénsalo bien por favor.",
    "Usa la razón >:(",
    "Te jodiste, no acepto un NO como respuesta."
];

let noCount = 0;

function showPopup(response) {
    const overlay = document.getElementById("overlay");
    const popupText = document.getElementById("popup-text");

    if (response === "Sí") {
        popupText.textContent = "No te arrepentirás, la pasaremos muy lindo, te espero <3";
        document.getElementById("popup-ok").onclick = function () {
            overlay.style.display = "none"; // Ocultar el popup
            createFloatingTexts(); // Mostrar "Me gustas muuuchooo"
        };
    } else {
        if (noCount < noResponses.length) {
            popupText.textContent = noResponses[noCount];
            noCount++;
        } else {
            document.getElementById("no-button").style.display = "none";
        }
    }
    overlay.style.display = "flex"; // Mostrar el popup
}

// Cerrar el popup al presionar "Ok"
document.getElementById("popup-ok").addEventListener("click", function () {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none"; // Ocultar el popup
});

// Generar emojis flotantes en todo el fondo
function createEmojis() {
    const emojiContainer = document.querySelector(".background-emojis");
    const emojiList = ["💖", "💕", "💗", "💘", "😍", "💞", "💓"];
    for (let i = 0; i < 30; i++) {
        let emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.top = `${Math.random() * 100}vh`;
        emoji.style.animationDuration = `${Math.random() * 3 + 2}s`;
        emojiContainer.appendChild(emoji);
    }
}
createEmojis();

// Generar textos flotantes de "Me gustas muuuchooo"
function createFloatingTexts() {
    const body = document.body;
    for (let i = 0; i < 20; i++) {
        let text = document.createElement("div");
        text.classList.add("floating-text");
        text.innerText = "Me gustas muuuchooo";
        text.style.left = `${Math.random() * 100}vw`;
        text.style.top = `${Math.random() * 100}vh`;
        text.style.animationDuration = `${Math.random() * 5 + 3}s`;
        body.appendChild(text);
    }
}