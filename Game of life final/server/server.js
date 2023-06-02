var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var { random } = require("./random")

app.use(express.static("../client"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});

let status_of_game=true
let time = 0
let weather = 1
let Grass = require("./class.js")
let GrassEater = require("./grassEater.js")
let Human = require("./human.js")
let Predator = require("./predator.js")
let SuperHuman = require("./superHuman.js")

matrix = []
grassArr = []
grassEatArr = []
predatorArr = []
humanArr = []
superHumanArr = []

var data = {
    matrix: [],
    weather: weather,
}
var characters = {
    grassArr: [],
    grassEatArr: [],
    predatorArr: [],
    humanArr: [],
    superHumanArr: [],
    weather: weather,
}



function generateMatrix() {
    let grassEaterCounter = 0;
    let predatorCounter = 0;
    let humanCounter = 0

    let maxGrassEaterCounter = 60
    let maxPredatorCounter = 80
    let maxHumanCounter = 60

    for (let i = 0; i <= 20; i++) {
        matrix[i] = [];
        for (let j = 0; j <= 20; j++) {
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
    matrix[matrix.length - 1][matrix[0].length] = 5
}

var gameInterval = null

function restart_function(data){
    if(data){
        generateMatrix()
        createObject()
    }
}
function play_pause(data) {
    if (data) {
        status_of_game=true
    } else{
        status_of_game=false
    }
}


function createObject() {
    grassArr = []
    grassEatArr = []
    predatorArr = []
    humanArr = []
    superHumanArr = []
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
            } else if (matrix[y][x] === 5) {
                let superHuman = new SuperHuman(x, y)
                superHumanArr.push(superHuman)
            }
        }
    }
}
function grassEaterBomb() {
    for (var i = 0; i < 10; i++) {
        let x = random(matrix.length)
        let y = random(matrix.length)
        for (var i in grassArr) {
            if (x === grassArr[i].x && y === grassArr[i].y) {
                grassArr.splice(i, 1)
                break;
            }
        }
        for (var i in predatorArr) {
            if (x === predatorArr[i].x && y === predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break;
            }
        }
        for (var i in grassEatArr) {
            if (x === grassEatArr[i].x && y === grassEatArr[i].y) {
                grassEatArr.splice(i, 1)
                break;
            }
        }
        matrix[x][y] = 2
        grassEatArr.push(new GrassEater(x, y))
    }
}

function game() {
    if(status_of_game==true){

        time++
        for (var i in grassArr) {
            if (weather !== 1) {
                grassArr[i].mul()
            }
        }
        for (var i in grassEatArr) {
            if (weather % 2 == 0) {
                grassEatArr[i].eat()
            } else {
                grassEatArr[i].mul()
            }
        }
        for (var i in predatorArr) {
            if (weather !== 4) {
                predatorArr[i].eat()
            } else {
                predatorArr[i].move()
            }
        }
        for (var i in humanArr) {
            if (weather !== 3) {
                humanArr[i].kill()
            }
        }
        for (var i in superHumanArr) {
            if (weather == 1) {
                superHumanArr[i].kill()
            } else {
                superHumanArr[i].kill()
                superHumanArr[i].kill()
                superHumanArr[i].kill()
            }
        }
        if (time % 5 === 0) {
            if (weather >= 4) {
                weather = 1
            } else {
                weather++
            }
        }
        if (time % 20 === 0) {
            grassEaterBomb()
        }
        createObject()
    }
    data.matrix = matrix
    data.weather = weather
    characters.weather = weather
    characters.grassArr = grassArr.length
    characters.grassEatArr = grassEatArr.length
    characters.predatorArr = predatorArr.length
    characters.humanArr = humanArr.length
    characters.superHumanArr = superHumanArr.length
    io.sockets.emit("my_matrix", data) //uxarkel
    io.sockets.emit("my_characters", characters)
}
    
setInterval(game, 200)
generateMatrix()

io.on('connection', function (socket) {
    socket.on("restart_checking", restart_function)
    socket.on("play_pause", play_pause)
})
