async function drink(amount) {
    const response = await fetch("/drink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
    });

    const data = await response.json();
    showModal(data.message);
    document.querySelector(".progress-text").textContent = `Has bebido ${(data.progress / 1000).toFixed(2)} L de 2 L`;
    document.getElementById("water").style.height = `${data.percentage}%`;
    document.getElementById("percentage-text").textContent = `${data.percentage}%`;

    // 💥 Animación si alcanza el objetivo
    if (data.goalReached) {
        const bottle = document.querySelector(".plastic-bottle");
        bottle.classList.add("shake");
        setTimeout(() => {
            bottle.classList.remove("shake");
        }, 1000);
    }
}

// 🌟 Mostrar mensaje flotante
function showModal(message) {
    const modal = document.getElementById("feedback-modal");
    const modalContent = document.querySelector(".modal-content");
    const modalMessage = document.getElementById("modal-message");

    modalMessage.textContent = message;

    // Si el mensaje contiene “objetivo” → cambia estilo
    if (message.toLowerCase().includes("objetivo")) {
        modalContent.style.background = "linear-gradient(135deg, #81ecec, #55efc4)";
    } else {
        modalContent.style.background = "rgba(255,255,255,0.95)";
    }

    modal.classList.remove("hidden");
}

// Cerrar el modal
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("feedback-modal").classList.add("hidden");
});

async function reset() {
    const response = await fetch("/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    const water = document.getElementById("water");
    const percentageText = document.getElementById("percentage-text");

    // Animación de vaciado (altura baja suavemente)
    water.style.transition = "height 1.2s ease-in-out";
    water.style.height = "0%";
    percentageText.textContent = "0%";
    document.querySelector(".progress-text").textContent = `Has bebido 0 L de 2 L`;

    // Mostrar mensaje flotante
    showModal(data.message);

    // Pequeño “shake” para el frasco
    const bottle = document.querySelector(".plastic-bottle");
    bottle.classList.add("shake");
    setTimeout(() => {
        bottle.classList.remove("shake");
    }, 800);
}
