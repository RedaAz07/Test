const player = document.getElementById("player");

// Sprite sheet info
const sheetWidth = 676;
const sheetHeight = 396;

const cols = 12;
const rows = 4;

const frameWidth = sheetWidth / cols;   
const frameHeight = sheetHeight / rows;

// Frames by direction
const FRAMES = {
    ArrowRight: [5, 11],
    ArrowLeft:  [6, 8, 9],
    ArrowUp:    [7, 10],
    ArrowDown:  [0, 1, 2, 3, 4]
};

let frameIndex = 0;
let x = 0;
let y = 0;
let speed = 10; // السرعة

document.addEventListener("keydown", (e) => {
    if (!FRAMES[e.key]) return;

    const framesList = FRAMES[e.key];

    // --- animation frames ---
    const col = framesList[frameIndex];
    const row = 0;

    const frameX = col * frameWidth;
    const frameY = row * frameHeight;

    player.style.backgroundPosition = `-${frameX}px -${frameY}px`;

    frameIndex++;
    if (frameIndex >= framesList.length) frameIndex = 0;

    // --- movement ---
    switch (e.key) {
        case "ArrowRight":
            x += speed;
            break;
        case "ArrowLeft":
            x -= speed;
            break;
        case "ArrowUp":
            y -= speed;
            break;
        case "ArrowDown":
            y += speed;
            break;
    }

    player.style.transform = `translate(${x}px, ${y}px)`;
});
