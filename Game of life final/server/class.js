// var socket=io()

// socket.on("my_matrix", matrix)
// function matrix(x){
//     var matrix2=x
//     return matrix2
// }

let livingCreature = require("./livingCreature.js")
var {random} = require("./random")
module.exports = class Grass extends livingCreature {
    constructor(x, y) {
        super(x, y)
    }
    mul() {
        if(this.multiply<25){
            this.multiply++;
            var newCell = random(this.chooseCell(0));
            if (this.multiply >= 8 && newCell) {
                var newGrass = new Grass(newCell[0], newCell[1], this.index);
                grassArr.push(newGrass);
                matrix[newCell[1]][newCell[0]] = 1;
                this.multiply = 0;  
            }
        }
        
    }
    
} 