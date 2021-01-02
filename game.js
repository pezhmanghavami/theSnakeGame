import {
    update as updateSnake, draw as drawSnake, SNAKE_SPEED,
    getSnakeHead, setSnakeHead, snakeIntersection
} from './snake.js';
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid, goThroughWall } from './grid.js';
import { getInputDirection } from "./input.js";

let remainingTime = 30;
let lastRenderTime = 0;//This is the last render time
let gameOver = false;
let score = 0;
let timer;
let animate;
let pause = false;
const gameBoard = document.querySelector("#game-board");
const gameScore = document.querySelector("#score");
const gameTime = document.querySelector("#remaining-time");

//This is the game loop
function main(currentTime) {//currentTime msec

    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
            restartGame();
        }
        return
    }
    if (pause) return;
    window.requestAnimationFrame(main);//Everytime that the browser is ready to paint , main is 
    //the function that we want to be ran. Calling window.requestAmimationFrame isn't like a 
    //function but rather a reserve for a promise of running a function --- MY UNDRESTANDING
    //A note: since this belongs to the window object we can optionally not write window. ... .

    const secondsSinceLastRedner = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRedner < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime;
    console.log(secondsSinceLastRedner);

    update();
    draw();
}

window.addEventListener('keydown', starter, true);

function starter() {
    const inputDirection = getInputDirection();
    if (inputDirection.x === 0 && inputDirection.y === 0) return;
    gameStart();
}

function gameStart() {
    animate = window.requestAnimationFrame(main);
    pause = false;
    startTimer(remainingTime);
    window.removeEventListener("keydown", starter, true);
}

export function pauseGame() {
    window.cancelAnimationFrame(animate);
    pause = true;
    window.addEventListener('keydown', starter, true);
    remainingTime = getRemainingTime();
}

function restartGame() {
    window.location = '/';//This will essentially refreshes the page
    //since we are already on the / page
}

function update() {
    updateSnake();
    updateFood();
    checkWall();
    checkDeath();
    showTimer();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    // gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
    gameOver = checkTimer(timer) || snakeIntersection();
}

function checkWall() {
    if (outsideGrid(getSnakeHead())) {
        setSnakeHead(goThroughWall(getSnakeHead()));
    }
}

function startTimer(secs) {
    timer = Date.now() + (1000 * secs);
}

function checkTimer(timer) {
    if (Date.now() + 100 >= timer)
        return true
    return false;
}

function showTimer() {
    gameTime.innerText = getRemainingTime();
}

function getRemainingTime() {
    return Math.floor((timer - Date.now()) / 1000);
}

export function showScore(scoreGained) {
    score += scoreGained;
    timer += (1000 * (scoreGained / 2));
    gameScore.innerText = score;
    showTimer()
}