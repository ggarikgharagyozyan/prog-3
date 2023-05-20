let livingCreature = require("./livingCreature.js")
module.exports = class GrassEater extends livingCreature {
    constructor(x, y) {
        super(x, y);
    }
    mul() {
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEatArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            
        }
    }
    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if(newCell){
            let newX=newCell[0]
            let newY=newCell[1]
            matrix[this.y][this.x]=0
            matrix[newY][newX]=2
            this.x= newX
            this.y= newY
        }   
        this.getNewCoordinates()
    }
    die(){
        matrix[this.y][this.x]=0
        for(var i in grassEatArr){
            if(this.x===grassEatArr[i].x && this.y===grassEatArr[i].y){
                grassEatArr.splice(i, 1)
                break;
            }
        }
    }
    eat(){
        let foods = this.chooseCell(1)
        let food = random(foods)
        if(this.energy===0){
            this.die()
        }else if(food){
            this.energy++
            matrix[this.y][this.x]=0
            let newX=food[0]
            let newY=food[1]
            this.x=newX
            this.y=newY
            matrix[this.y][this.x]=2
            for(var i in grassArr){
                if(newX === grassArr[i].x && newY === grassArr[i].y){
                    grassArr.splice(i, 1)
                    break;
                }
            }
            if(this.energy >= 8){
                this.mul()
            }
        }else{
            this.move()
        }
        
    }
}