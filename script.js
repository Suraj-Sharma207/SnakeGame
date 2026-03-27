const board = document.querySelector(".board");

const blockHeight = 30;
const blockWeigth = 30;

const blocks = [];
const snake = [{x:1,y:3}];

let direction = "right";

const cols = Math.floor(board.clientWidth/blockWeigth);
const rows = Math.floor(board.clientHeight/blockHeight);


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
    snake.forEach(segment => (
        blocks[`${segment.x}-${segment.y}`].classList.add("snakeBody")
    ))
    
}

// setInterval calls autometacally render in every 3 sec. 
setInterval(()=>{
    let head = null;

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
        alert("Ganme Over")
    }

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("snakeBody")
    });

    snake.unshift(head);
    snake.pop();
    render();
},300);

// ArrowUp
// ArrowDown
// ArrowLeft
// ArrowRight

addEventListener("keydown" , (event)=>{
    if(event.key == "ArrowUp"){
        direction = "up"
    }
    else if(event.key == "ArrowDown"){
        direction = "down"
    }
    else if(event.key == "ArrowRight"){
        direction = "right"
    }
    else if(event.key == "ArrowLeft"){
        direction = "left"
    }
    
})