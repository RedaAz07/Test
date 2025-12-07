const player = document.getElementById("player");

// Sprite sheet info
const sheetWidth = 832;
const sheetHeight = 3456;
const cols = 13;
const rows = 54;
const frameWidth = sheetWidth / cols;
const frameHeight = sheetHeight / rows;






let bomb = false;
let bombe = null;

let colb = 0;

const sheetWidthbomb = 2816;
const sheetHeightbomb = 1536;
const colsbomb = 8;
const rowsbomb = 5;

const frameWidthbomb = 50 ;
const frameHeightbomb = 50 ;
console.log(frameWidthbomb, frameHeightbomb);

// Frames by direction
const FRAMES = {
    ArrowRight: { row: 11, col: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    ArrowLeft: { row: 9, col: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    ArrowUp: { row: 8, col: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    ArrowDown: { row: 10, col: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
};
const bombFrames = {

    timing: { row: 0, col: [0, 1, 2, 3, 5,6,7] },
    explosion: { row: 2, col: [0,1,2,3,4,5,6,7,] },
    finally: { row: 5, col: [0, 1, 2, 3,] }

}


let bombPhase = "timing"; // "timing" | "explosion" | "finally"
let bombFrameIndex = 0;
let bombTimer = 0;
const bombSpeed = 100; // ms per frame

let frameIndex = 0;
let posX = 0;
let posY = 0;
let speed = 0.1;
let currentKey = null;

document.addEventListener("keydown", (e) => {

    if (FRAMES[e.key]) {
        currentKey = e.key;
    }
    if (e.code === "Space" && !bomb) {

        bombe = document.createElement("div");
        bombe.className = "bomb";
        bombe.style.width = "50px";
        bombe.style.height = "50px";
        bombe.style.position = "absolute";

        const rect = player.getBoundingClientRect();

        bombe.style.top = `${rect.top}px`;
        bombe.style.left = `${rect.left}px`;

        document.body.appendChild(bombe);

        bomb = true;
        colb = 0;
    }
});

document.addEventListener("keyup", (e) => {
    if (currentKey === e.key) {

        currentKey = null;
        frameIndex = 0;
    }
});

let lastTime = 0;
let animationTimer = 0;
let animationSpeed = 80;

function update(time) {

    if (bomb && bombe) {
        const phase = bombFrames[bombPhase]; // current phase object
        const col = phase.col[bombFrameIndex];
        const row = phase.row;

        const frameX = col * frameWidthbomb;
        const frameY = row * frameHeightbomb;

        bombe.style.backgroundPosition = `-${frameX-4}px -${frameY-13}px`;

       bombTimer += time - lastTime;
        if (bombTimer > bombSpeed) {
            bombTimer = 0;
       bombFrameIndex++;

            if (bombFrameIndex >= phase.col.length) {
                // move to next phase
                if (bombPhase === "timing") bombPhase = "explosion";
                else if (bombPhase === "explosion") bombPhase = "finally";
                else if (bombPhase === "finally") {
                    // remove bomb
                    bombe.remove();
                    bomb = false;
                    bombe = null;
                }
                bombFrameIndex = 0;
            }
        }
    }
    const delta = time - lastTime;
    lastTime = time;

    if (currentKey) {
        const anim = FRAMES[currentKey];
        const col = anim.col[frameIndex];
        const row = anim.row;

        // frame position
        const frameX = col * frameWidth;
        const frameY = row * frameHeight;

        player.style.backgroundPosition = `-${frameX + 5}px -${frameY + 13}px`;

        // movement with deltaTime
        if (currentKey === "ArrowRight") posX += speed * delta;
        if (currentKey === "ArrowLeft") posX -= speed * delta;
        if (currentKey === "ArrowUp") posY -= speed * delta;
        if (currentKey === "ArrowDown") posY += speed * delta;

        player.style.transform = `translate3d(${posX}px, ${posY}px,0)`;

        animationTimer += delta;
        if (animationTimer > animationSpeed) {
            animationTimer = 0;
            frameIndex++;
            colb++;

            if (frameIndex >= anim.col.length) frameIndex = 0;
        }
    }
    requestAnimationFrame(update);
}
update(0);
