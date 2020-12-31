import { showScore } from "./game.js";
import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 11;//This will be how many times the snake moves per second

const snakeBody = [{ x: 25, y: 25 }];
let newSegments = 0;

export function update() {
    addSegments();
    const inputDiretion = getInputDirection();
    if (inputDiretion.x === 0 && inputDiretion.y === 0) return
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDiretion.x;
    snakeBody[0].y += inputDiretion.y;
    console.log(snakeBody[0]);
}

export function draw(gameBoard) {
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        if (index === 0) snakeElement.id = 'snake-head';
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments = amount;
    showScore(newSegments);
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position);
    })
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function setSnakeHead(newHeadPos) {
    snakeBody[0] = { ...newHeadPos };
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(position1, position2) {
    return position1.x === position2.x && position1.y === position2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}