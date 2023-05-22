var socket=io()

socket.on("my_matrix", my_draw)

function setup() {
    createCanvas(550, 550)
    background('#acacac');
}

function my_draw(matrix) {
    console.log(matrix)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red")
            } else if (matrix[y][x] == 4) {
                fill("orange")
            }else if(matrix[y][x] == 5){
                fill("blue")
            }
            rect(x * 50, y * 50, 50, 50);

            /*
            fill("blue")
            text(x+" "+y, x*side+side/2,y*side+side/2)
            */
        }
    }

    // let statistic=`
    // Grasses: ${grassArr.length}
    // Grass Eaters: ${grassEatArr.length}
    // Humans: ${humanArr.length}
    // SuperHuman: ${superHumanArr.length}
    // Predators: ${predatorArr.length}`
    
    // fill("#acacac")
    // rect(100, 650, matrix[0].length * side - 250, matrix.length * side - 330)
    // fill("black")
    // textSize(32)
    // text(statistic, matrix[0].length * side - 450, matrix.length * side + 100)

}