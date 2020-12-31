import {
    update as updateSnake, draw as drawSnake, SNAKE_SPEED,
    getSnakeHead, setSnakeHead, snakeIntersection
} from './snake.js';
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid, goThroughWall } from './grid.js';

let lastRenderTime = 0;//This is the last render time
let gameOver = false;
let score = 0;
let timer;
const gameBoard = document.querySelector("#game-board");
const gameScore = document.querySelector("#score");
const gameTime = document.querySelector("#remaining-time");

//This is the game loop
function main(currentTime) {//currentTime msec

    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
            window.location = '/';//This will essentially refreshes the page
            //since we are already on the / page
        }
        return
    }
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

window.requestAnimationFrame(main);

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

function startTimer() {
    timer = Date.now() + (1000 * 30)//30 seconds
}

function checkTimer(timer) {
    if (Date.now() + 100 >= timer)
        return true
    return false;
}

function showTimer() {
    gameTime.innerText = Math.floor((timer - Date.now()) / 1000);
}

export function showScore(scoreGained) {
    score += scoreGained;
    timer += (1000 * 5);
    gameScore.innerText = score;
    showTimer()
}