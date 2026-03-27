const board = document.querySelector(".board");

const blockHeight = 30;
const blockWeigth = 30;

const blocks = [];
const snake = [{x:1,y:3}];


let direction = "right";

const cols = Math.floor(board.clientWidth/blockWeigth);
const rows = Math.floor(board.clientHeight/blockHeight);
let intervalID = null;
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
    
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        alert("Game Over")
        clearInterval(intervalID)
    }
    //self collision detection
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            alert("Game Over");
            clearInterval(intervalID);
            return;
        }
    }

    //remove the food to another place when head of snake meets the food
    if(head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food")
        snake.unshift(head); 
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

// setInterval calls autometacally render in every 3 sec. 
intervalID = setInterval(()=>{
    render();
},300);

// ArrowUp
// ArrowDown
// ArrowLeft
// ArrowRight

addEventListener("keydown" , (event)=>{
    if(event.key === "ArrowUp" && direction !== "down") direction = "up";
    if(event.key === "ArrowDown" && direction !== "up") direction = "down";
    if(event.key === "ArrowRight" && direction !== "left") direction = "right";
    if(event.key === "ArrowLeft" && direction !== "right") direction = "left";
    
})