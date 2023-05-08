let matrix = []

let side = 50;
let grassArr = []
let grassEatArr = []
let predatorArr = []
let humanArr = []
let superHumanArr =[]

function setup() {
    let grassEaterCounter = 0;
    let predatorCounter = 0;
    let humanCounter = 0

    let maxGrassEaterCounter = 100
    let maxPredatorCounter = 10
    let maxHumanCounter = 10

    for (let i = 0; i <= 10; i++) {
        matrix[i] = [];
        for (let j = 0; j <= 10; j++) {
            if (predatorCounter <= maxPredatorCounter && grassEaterCounter <= maxGrassEaterCounter && humanCounter <= maxHumanCounter) {
                let newObj = Math.floor(random(5));
                if (newObj === 2) {
                    predatorCounter++;
                } else if (newObj === 3) {
                    grassEaterCounter++;
                } else if (newObj === 4) {
                    humanCounter++
                }
                matrix[i].push(newObj);
            } else if (predatorCounter > maxPredatorCounter || grassEaterCounter > maxGrassEaterCounter || humanCounter > maxHumanCounter) {
                let newObj = Math.floor(random(2));
                matrix[i].push(newObj);
            } else if (predatorCounter > maxPredatorCounter) {
                let numbers = [0, 1, 2, 5];
                let newObj = Math.floor(random(4));
                if (newObj === 2) {
                    grassEaterCounter++;
                } else if (newObj === 3) {
                    humanCounter++
                }
                matrix[i].push(numbers[newObj]);
            } else if (grassEaterCounter > maxGrassEaterCounter) {
                let numbers = [0, 1, 3, 5];
                let newObj = Math.floor(random(3));
                if (newObj === 2) {
                    predatorCounter++;
                } else if (newObj === 3) {
                    humanCounter++
                }
                matrix[i].push(numbers[newObj]);
            } else if (humanCounter > maxHumanCounter) {
                let newObj = Math.floor(random(4));
                if (newObj === 2) {
                    grassEaterCounter++;
                } else if (newObj === 3) {
                    predatorCounter++
                }
                matrix[i].push(newObj);
            }
        }
    }
    frameRate(10);
    matrix[matrix.length-1][matrix[0].length]=5
    createCanvas(matrix[0].length * side, matrix.length * side + 350);
    background('#acacac');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } else if (matrix[y][x] === 2) {
                let grassEater = new GrassEater(x, y)
                grassEatArr.push(grassEater)
            } else if (matrix[y][x] === 3) {
                let predatorObj = new Predator(x, y)
                predatorArr.push(predatorObj)
            } else if (matrix[y][x] === 4) {
                let humanObj = new Human(x, y)
                humanArr.push(humanObj)
            } else if(matrix[y][x] === 5){
                let superHuman= new SuperHuman(x, y)
                superHumanArr.push(superHuman)
            }
        }
    }
    var gr = new Grass(1, 2, 1);
    var emptyCells = gr.chooseCell(0);
    
}

function draw() {
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
            rect(x * side, y * side, side, side);

            /*
            fill("blue")
            text(x+" "+y, x*side+side/2,y*side+side/2)
            */
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEatArr) {
        grassEatArr[i].eat()
    }
    for (var i in predatorArr) {
        predatorArr[i].eat()
    }
    for (var i in humanArr) {
        humanArr[i].kill()
    }
    for(var i in superHumanArr){
        superHumanArr[i].kill()
    }

    let statistic=`
    Grasses: ${grassArr.length}
    Grass Eaters: ${grassEatArr.length}
    Humans: ${humanArr.length}
    SuperHuman: ${superHumanArr.length}
    Predators: ${predatorArr.length}`
    
    fill("#acacac")
    rect(100, 650, matrix[0].length * side - 250, matrix.length * side - 330)
    fill("black")
    textSize(32)
    text(statistic, matrix[0].length * side - 450, matrix.length * side + 100)

}


