var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");
const width = 480;
const height = 360;
var grid_size = 24;

var snake = {
    x: 240,
    y: 192,
    dx: grid_size,
    dy: 0,
    max_length:4,
    cells:[]
    }; 
    var food = {
    x:120,
    y:144
};

function random_int(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function place_food(){
    food.x = random_int(0, width/grid_size) * grid_size;
    food.y = random_int(0, height/grid_size) * grid_size;
}

function reset_game(){
    snake.x = 240;
    snake.y = 192;
    snake.dx = grid_size;
    snake.dy = 0;
    snake.max_length = 4;
    snake.cells = [];
    food.x = 120;
    food.y = 144;
}

function draw_snake() {
for (i = 0; i < snake.cells.length; i++) {
    ctx.beginPath();
    ctx.rect(snake.cells[i].x ,snake.cells[i].y , grid_size-1, grid_size-1);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    }
}

function draw_food(){
    ctx.beginPath();
    ctx.rect(food.x, food.y,  grid_size-1, grid_size-1);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

var returnedInput;
function loop(){
    if (returnedInput == "right"){
        if (snake.dx == 0){
            snake.dx = grid_size;
            snake.dy = 0;
        }
    }
    else if (returnedInput == "left"){
        if (snake.dx == 0){
            snake.dx = -grid_size;
            snake.dy = 0;
        }
    }

    else if (returnedInput == "up"){
        if (snake.dy == 0){
            snake.dy = -grid_size;
            snake.dx = 0;
        }
    }

    else if (returnedInput == "down"){
        if (snake.dy == 0){
            snake.dy = grid_size;
            snake.dx = 0;
        }
    }

    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.cells.unshift({x:snake.x, y:snake.y});
    if (snake.cells.length > snake.max_length){
        snake.cells.pop();
    }

    if (snake.x == food.x && snake.y == food.y){
        snake.max_length += 1;
        while (snake.x == food.x && snake.y == food.y){
            place_food();
        }
    }

    if (snake.x >= width || snake.x < 0 || snake.y >= height || snake.y < 0){
        reset_game();
    }

    for (i = 1; i < snake.cells.length; i++){
        if (snake.x == snake.cells[i].x && snake.y == snake.cells[i].y){
            reset_game();
        }
    }

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(0,0,width, height);
    ctx.fillStyle = "#a0a0a0";
    ctx.fill();
    ctx.closePath();
    draw_snake();
    draw_food();
    returnedInput = "";

    ctx.beginPath();
    ctx.rect(0, height, width, height + 20);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
    ctx.font = "15pt calibri";
    ctx.fillStyle = "black";
    ctx.fillText(snake.cells.length, 10, 375);
}
    //BUG if user input is too fast, snake can go back on itself and kill itself.
    document.addEventListener("keydown", key_handler, false);
    function key_handler(event){
    if (event.key == "Right" || event.key == "ArrowRight" || event.key == "KeyD" ){
        returnedInput = "right";
    }
    else if (event.key == "Left" || event.key == "ArrowLeft" || event.key == "KeyA"){
        returnedInput = "left";
    }
    else if (event.key == "Up" || event.key == "ArrowUp" || event.key == "KeyW"){
        returnedInput = "up";
    }
    else if (event.key == "Down" || event.key == "ArrowDown" || event.key == "KeyS"){
        returnedInput = "down";
    }

}
setInterval(loop, 100);  //draws and loops every 100ms
