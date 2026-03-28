const board = document.querySelector(".board");
const buttonStart = document.querySelector(".btn-start");
const buttonRestart = document.querySelector(".btn-restart");
const displayRestart = document.querySelector(".endGame");
const displayStart = document.querySelector(".startGame");
const gameDisplay = document.querySelector(".enterGame");
const highScoreElement = document.querySelector("#highScore");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");
const currentScoreElement = document.querySelector("#cScore");

const blockHeight = 30;
const blockWeigth = 30;

let highScore = localStorage.getItem("highScore") || 0
let score = 0
let time = "00:00"
let currentScore = 0

highScoreElement.innerText = highScore

const blocks = [];
let snake = [{x:1,y:3}];


let direction = "right";

const cols = Math.floor(board.clientWidth/blockWeigth);
const rows = Math.floor(board.clientHeight/blockHeight);
let intervalID = null;
let timeIntervalID = null;
let food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)};


for(let row = 0; row<rows; row++){
    for(let col = 0; col<cols; col++){
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        //show cordinets
        //block.innerText = `${row}-${col}`;
        blocks[`${row}-${col}`] = block;
    }
}

function render() {

    let head = null

    blocks[`${food.x}-${food.y}`].classList.add("food")

    if(direction == "left"){
        head = {x: snake[0].x , y:snake[0].y-1}
    }
    else if(direction == "right"){
        head = {x: snake[0].x , y:snake[0].y+1}
    }
    else if(direction == "down"){
        head = {x: snake[0].x+1 , y:snake[0].y}
    }
    else if(direction == "up"){
        head = {x: snake[0].x-1 , y:snake[0].y}
    }
    
    //Wall collision logic
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        
        clearInterval(intervalID)

        gameDisplay.style.display = "flex";
        displayStart.style.display = "none";
        displayRestart.style.display = "flex";
        return
    }

    
    //Self collision detection
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
             
            clearInterval(intervalID);

            gameDisplay.style.display = "flex";
            displayStart.style.display = "none";
            displayRestart.style.display = "flex";
            return;
        }
    }

    //Food Consume Block
    if(head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food")
        snake.unshift(head);
        
        score += 5
        scoreElement.innerText = score
        currentScoreElement.innerText = score

        if(highScore < score ){
            highScore=score
            localStorage.setItem("highScore",highScore.toString())
        }
    }

    
    

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("snakeBody")
    });

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment => (
        blocks[`${segment.x}-${segment.y}`].classList.add("snakeBody")
    ))
    
}


buttonStart.addEventListener("click",()=>{
    gameDisplay.style.display = "none";
    intervalID = setInterval(()=>{render();},300)
    timeIntervalID = setInterval(()=>{
        let [min,sec] = time.split(":").map(Number)

        if(sec==59){
            min += 1
            sec = 0
        }else{
            sec+=1
        }
        time = `${min}:${sec}`
        timeElement.innerText = time
    },1000)
})

buttonRestart.addEventListener("click",restartGame);

function restartGame(){

    //calculating score
    score = 0
    time = "00:00"
    currentScore = 0
    highScore = localStorage.getItem("highScore")
    highScoreElement.innerText = highScore
    scoreElement.innerText = score
    timeElement.innerText = time
    currentScoreElement.innerText = currentScore 
    
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach(segment => (
        blocks[`${segment.x}-${segment.y}`].classList.remove("snakeBody")
    ))

    gameDisplay.style.display = "none";
    direction = "down"
    snake = [{x:1,y:3}];
    food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)};
    intervalID = setInterval(()=>{render();},300)
} 

addEventListener("keydown" , (event)=>{
    if(event.key === "ArrowUp" && direction !== "down") direction = "up";
    if(event.key === "ArrowDown" && direction !== "up") direction = "down";
    if(event.key === "ArrowRight" && direction !== "left") direction = "right";
    if(event.key === "ArrowLeft" && direction !== "right") direction = "left";
    
})