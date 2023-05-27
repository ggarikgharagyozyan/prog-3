var socket=io()

socket.on("my_matrix", my_draw)
socket.on("my_characters", statistic)

function setup() {
    createCanvas(1000, 1000)
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
            rect(x * 50, y * 50, 50, 50);

            /*
            fill("blue")
            text(x+" "+y, x*side+side/2,y*side+side/2)
            */
        }
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