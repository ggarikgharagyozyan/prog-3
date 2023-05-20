var express = require("express");
var app = express();

app.use(express.static("../client"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

app.listen(3000, function () {
    console.log("Example is running on port 3000");
});

let Grass = require("./class.js")
let GrassEater = require("./grassEater.js")
let Human = require("./human.js")
let Predator = require("./predator.js")
let SuperHuman = require("./superHuman.js")

let matrix = []
let grassArr = []
let grassEatArr = []
let predatorArr = []
let humanArr = []
let superHumanArr =[]

function random(numb){
    let number=Math.floor(Math.random()*numb)
    return number
}

function generateMatrix(){
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
generateMatrix()
console.log(matrix)