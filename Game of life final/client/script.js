var socket = io();

socket.on("my_matrix", my_draw);
socket.on("my_characters", statistic);

var statuss=true
function restart(){
    let restart_checking=false
    restart_checking=true
    socket.emit("restart_checking", restart_checking) 
}
function pause(){
    statuss=false
    socket.emit("play_pause", false)
}
function play(){
    statuss=true
    socket.emit("play_pause", true)
}
let button = document.getElementById("restart_button");
let button2 = document.getElementById("play_pause");
button.addEventListener("click", restart);
function setup() {
    createCanvas(700, 700)
    background('#acacac');
}

function my_draw(data) {
    for (var y = 0; y < data.matrix.length; y++) {
        for (var x = 0; x < data.matrix[y].length; x++) {
            if (data.matrix[y][x] == 1) {
                if(data.weather==1){
                    fill("white");
                }else if(data.weather==2){
                    fill("green")
                }else if(data.weather==3){
                    fill("#34eb92")
                }else if(data.weather==4){
                    fill("#0a6639")
                }
            }
            else if (data.matrix[y][x] == 0) {
                fill("#acacac");
            } else if (data.matrix[y][x] == 2) {
                fill("yellow");
            } else if (data.matrix[y][x] == 3) {
                fill("red")
            } else if (data.matrix[y][x] == 4) {
                fill("orange")
            }else if(data.matrix[y][x] == 5){
                fill("blue")
            }
            rect(x * 35, y * 35, 35, 35);

        }
    }
    if(statuss){
        button2.innerText="Pause"
        button2.addEventListener("click", pause);
        button2.removeEventListener("click", play);
    }else if(!statuss){
        button2.innerText="Play"
        button2.addEventListener("click", play);
        button2.removeEventListener("click", pause);
    }
}
function statistic(characters){
    let statistic=`
    Grasses: ${characters.grassArr}
    Grass Eaters: ${characters.grassEatArr}
    Humans: ${characters.humanArr}
    SuperHuman: ${characters.superHumanArr}
    Predators: ${characters.predatorArr}`
    
    let weatherName;

    if(characters.weather==1){
        weatherName="Winter"
    }else if(characters.weather==2){
        weatherName="Spring"
    }else if(characters.weather==3){
        weatherName="Summer"
    }else if(characters.weather==4){
        weatherName="Autumn"
    }

    let finalText=`${statistic}
    ${weatherName}`

    let p=document.getElementById("statistic")
    p.innerText = finalText
}
