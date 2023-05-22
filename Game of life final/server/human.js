let livingCreature = require("./livingCreature.js")
const Predator = require("./predator.js")
var {random} = require("./random")
// var socket=io()

// socket.on("my_matrix", matrix)
// function matrix(x){
//     var matrix2=x
//     return matrix2
// }

module.exports = class Human extends livingCreature{
    constructor(x, y){
        super(x, y)        
    }
    die(){
        matrix[this.y][this.x]=0
        for(var i in humanArr){
            if(this.x===humanArr[i].x && this.y===humanArr[i].y){
                humanArr.splice(i, 1)
                break;
            }
        }
    }
    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }
        this.getNewCoordinates()
    }
    mul(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newHuman = new Human(newCell[0], newCell[1]);
            humanArr.push(newHuman);
            matrix[newCell[1]][newCell[0]] = 4;
        }
    }
    kill(){
        let grassEaters=this.chooseCell(2)
        let grassEater=random(grassEaters)
        if(this.age>=this.yearsToLive){
            this.die()
        }else if(grassEater){
            this.age++
            this.yearsToLive++
            matrix[this.y][this.x]=0
            let newX=grassEater[0]
            let newY=grassEater[1]
            this.x=newX
            this.y=newY
            matrix[newY][newX]=4
            for(var i in grassEatArr){
                if(newX === grassEatArr[i].x && newY === grassEatArr[i].y){
                    grassEatArr.splice(i, 1)
                    break;
                }
            }
            if(this.age >= 4 && this.age <= 50 && this.age % 10 == 0){
                this.mul()
            }
        }else{
            this.age++
            this.move()
        }
    }
}