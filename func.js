function timeToSec(time) {
    var hour = time.split(':')[0]
    var min = time.split(':')[1]
    var sec = time.split(':')[2]
    var s = Number(hour * 3600) + Number(min * 60) + Number(sec)
    return s * 1000
}

module.exports = {
    timeToSec
};