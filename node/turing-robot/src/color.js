const colorMap = {
    "Red": "\x1b[31m",
    "Green": "\x1b[32m",
    "Yellow": "\x1b[33m",
    "Blue": "\x1b[34m",
    "Magenta": "\x1b[35m",
    "Cyan": "\x1b[36m",
    "White": "\x1b[37m"
}

const colors = Object.values(colorMap)

module.exports = {
    log(...args) {
        let index = parseInt(Math.random() * colors.length)
        let color = colors[index]
        console.log(color, ...args)
    }
}