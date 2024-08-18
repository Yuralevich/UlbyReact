let str = `[BreakBeat|ErgoProxy] killed [Kisa|Nightmare] (+1)
[BreakBeat|ErgoProxy] killed [MirosH|Nightmare] (+1)
[Kisa|Nightmare] killed [Vald|ErgoProxy] (+1)
[BreakBeat|ErgoProxy] killed [Kisa|Nightmare] (+1)
[Nightmare] holds the Fortress (+10)
[Kyle Wick|ErgoProxy] killed [MirosH|Nightmare] (+1)
[M9lSoRu6Ka|Nightmare] killed [fastpumba|ErgoProxy] (+1)
[Kyle Wick|ErgoProxy] killed [Kiruvvka|ChronoCross] (+1)
[Kyle Wick|ErgoProxy] killed [M9lSoRu6Ka|Nightmare] (+1)
[Kyle Wick|ErgoProxy] killed [Kisa|Nightmare] (+1)
[BreakBeat|ErgoProxy] destroyed Emperium (+25)
[ErgoProxy] holds the Fortress (+10)
[Kisa|Nightmare] killed [fastpumba|ErgoProxy] (+1)
[Kisa|Nightmare] killed [Vald|ErgoProxy] (+1)
[Kyle Wick|ErgoProxy] killed [MirosH|Nightmare] (+1)
[M9lSoRu6Ka|Nightmare] killed [BreakBeat|ErgoProxy] (+1)
[M9lSoRu6Ka|Nightmare] killed [Kyle Wick|ErgoProxy] (+1)
[M9lSoRu6Ka|Nightmare] destroyed Emperium (+25)
[Nightmare] holds the Fortress (+10)
[Kyle Wick|ErgoProxy] killed [MirosH|Nightmare] (+1)`
    .replace(/[\[\]]/g, '').replace(/\|/g, '-')

let arr = str.match(/.+ killed .+/g)
let arrEmp = str.match(/.+ destroyed .+/g).map(a => a.replace(/(.+ destroyed) .+/g, '$1'))
let killers = []
let deads = []
for (let i = 0; i < arr.length; i++) {
    if (!killers.includes(arr[i].replace(/(.+ killed) .+/g, '$1'))) {
        killers.push(arr[i].replace(/(.+ killed) .+/g, '$1'))
    }

    if (!deads.includes(arr[i].replace(/.+ (killed .+) .+/g, '$1'))) {
        deads.push(arr[i].replace(/.+ (killed .+) .+/g, '$1'))
    }

}
for (let i = 0; i < killers.length; i++) {
    let count = 0
    let rX = new RegExp(killers[i], 'g')
    count = str.match(rX).length
    killers[i] = [killers[i]]
    killers[i][1] = count
}
killers.map(a => a[0] = a[0].replace(/ killed/g, ''))

for (let i = 0; i < deads.length; i++) {
    let count = 0
    let rX = new RegExp(deads[i], 'g')
    count = str.match(rX).length
    deads[i] = [deads[i]]
    deads[i][1] = count
}
deads.map(a => a[0] = a[0].replace(/killed /g, ''))

for (let i = 0; i < arrEmp.length; i++) {
    let count = 0
    let rX = new RegExp(arrEmp[i], 'g')
    count = str.match(rX).length
    arrEmp[i] = [arrEmp[i]]
    arrEmp[i][1] = count
}
arrEmp.map(a => a[0] = a[0].replace(/ destroyed/g, ''))

let players = [...new Set(killers.map(a => a[0])
    .concat(deads.map(a => a[0]))
    .concat(arrEmp.map(a => a[0])))]

let scores = []
for (let i = 0; i < players.length; i++) {
    scores.push(players[i])
    if (killers.map(a => a[0]).includes(players[i])) {
        for (let k = 0; k < killers.length; k++) {
            if (killers[k][0] == players[i]) {
                scores[i] = [scores[i]]
                scores[i][1] = killers[k][1]
            }
        }
    } else {
        scores[i] = [scores[i]]
        scores[i][1] = 0
    }

    if (deads.map(a => a[0]).includes(players[i])) {
        for (let k = 0; k < deads.length; k++) {
            if (deads[k][0] == players[i]) {
                scores[i][2] = deads[k][1]
            }
        }
    } else {
        scores[i][2] = 0
    }

    if (arrEmp.map(a => a[0]).includes(players[i])) {
        for (let k = 0; k < arrEmp.length; k++) {
            if (arrEmp[k][0] == players[i]) {
                scores[i][3] = arrEmp[k][1]
            }
        }
    } else {
        scores[i][3] = 0
    }
}
scores = scores.sort(function (a, b) {
    if (b[1] < a[1]) return -1
    if (b[1] > a[1]) return 1
    return 0
})
scores.map(a => a.push(a[1] + a[3] * 25))
scores = scores.map(a => a = { 'name': a[0], 'killed': a[1], 'died': a[2], 'Emp destroyed': a[3], 'total points': a[4] })
console.table(scores)
