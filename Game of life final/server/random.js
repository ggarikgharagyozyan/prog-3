function random(numb) {
    console.log(numb, "aaaaaaa")
    let number = Math.floor(Math.random() * numb)
    console.log(number, "this is number")
    return number
}

module.exports = {random}