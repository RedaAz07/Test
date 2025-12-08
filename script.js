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


const colsbomb = 5;
const rowsbomb = 1;

const frameWidthbomb = 50;
const frameHeightbomb = 50;

// Frames by direction
const FRAMES = {
    ArrowRight: { row: 11, col: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    ArrowLeft: { row: 9, col: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    ArrowUp: { row: 8, col: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    ArrowDown: { row: 10, col: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
};
const bombFrames = {

    bomb: { row: 0, col: [0, 1, 2, 3, 4] },


}



let bombFrameIndex = 0;

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



        const rect = player.getBoundingClientRect();

        bombe.style.top = `${rect.top}px`;
        bombe.style.left = `${rect.left}px`;

        document.body.appendChild(bombe);

        bomb = true;
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
let animationTimerbomb = 0;

let animationSpeed = 80;
let animationSpeedbomb = 300
function update(time) {
    const delta = time - lastTime;
    lastTime = time;

    if (bomb && bombe) {
        const maxFrames = bombFrames.bomb.col.length; // = 5

        if (bombFrameIndex >= maxFrames) {
            bombFrameIndex = 0;
            bombe.remove();
            bombe = null;
            bomb = false;
        } else {

          /*   if (bombFrameIndex === 3) {
                bombe = document.createElement("div");
                bombe.className = "bomb";




               

                document.body.appendChild(bombe);

            }
 */
            const col = bombFrameIndex;


            const frameX = col * frameWidthbomb;

            bombe.style.backgroundPosition = `-${frameX}px`;
        }
        animationTimerbomb += delta;
        if (animationTimerbomb > animationSpeedbomb) {
            animationTimerbomb = 0;
            bombFrameIndex++

        }


    }


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
