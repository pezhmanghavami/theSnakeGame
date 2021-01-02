import { pauseGame } from "./game.js";

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };


//The way that arrow up and down are is because how grid works
window.addEventListener("keydown", e => {
    switch (e.key) {
        case " ":
            if (inputDirection.x === 0 && inputDirection.y === 0) break;
            pauseGame();
            inputDirection = { x: 0, y: 0 }
            break;
        case "ArrowUp":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 }
            break;
        case "ArrowDown":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 }
            break;
        case "ArrowRight":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 }
            break;
        case "ArrowLeft":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 }
            break;
    }
});

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}