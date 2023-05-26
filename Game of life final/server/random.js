function random(numb) {
    if(Array.isArray(numb)){
        let number = Math.floor(Math.random() * numb.length)
        return numb[number]
    }else{
        let number = Math.floor(Math.random() * numb)
        return number
    }
}

module.exports = {random}