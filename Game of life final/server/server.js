var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("../client"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});



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

function random(numb) {
    let number = Math.floor(Math.random() * numb)
    return number
}



function generateMatrix() {
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
}
io.on('connection', function (socket) {
    // socket.emit("my_matrix", matrix) //uxarkel
}); 

function createObject(){
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
}
function game(){
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    // for (var i in grassEatArr) {
    //     grassEatArr[i].eat()
    // }
    // for (var i in predatorArr) {
    //     predatorArr[i].eat()
    // }
    // for (var i in humanArr) {
    //     humanArr[i].kill()
    // }
    // for(var i in superHumanArr){
    //     superHumanArr[i].kill()
    // }
console.log('c_g=>', grassArr.length,'c_ge=>', grassEatArr.length, 'pr=>',predatorArr.length   )
   io.sockets.emit("my_matrix", matrix) //uxarkel
}
generateMatrix()
createObject()
setInterval(game, 2000)