let arr = Array()
arrlet str = `
[M9lSoRu6Ka|Nightmare] killed [Valkyrie|ErgoProxy] (+1)
[BreakBeat|ErgoProxy] killed [Karatel|ChronoCross] (+1)
[ErgoProxy] holds the Fortress (+10)
[M9lSoRu6Ka|Nightmare] destroyed Emperium (+25)
`.replace(/[\[\]]/g, '').replace(/\|/g, '-').replace(/ /g, ' ')

let arr = str.match(/.+ killed .+/g)
let arrHolds = str.match(/.+ holds .+/g)
let arrEmp = str.match(/.+ destroyed .+/g).map(a => a.replace(/(.+ destroyed) .+/g, '$1'))
let holds = []
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

for (let i = 0; i < arrHolds.length; i++) {
    if (!holds.includes(arrHolds[i].replace(/(.+ holds) .+/g, '$1'))) {
        holds.push(arrHolds[i].replace(/(.+ holds) .+/g, '$1'))
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

for (let i = 0; i < holds.length; i++) {
    let count = 0
    let rX = new RegExp(holds[i], 'g')
    count = str.match(rX).length
    holds[i] = [holds[i]]
    holds[i][1] = count
}
holds.map(a => a[0] = a[0].replace(/ holds/g, ''))
holds.map(a => a[1] = a[1] * 10)

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
arrEmp.map(a => a[0] = a[0].replace(/ destroyed/g, ''))

let players = [...new Set(killers.map(a => a[0])
    .concat(deads.map(a => a[0]))
    .concat(arrEmp.map(a => a[0])))]

for (let i = 0; i < holds.length; i++) {
    let count = 0
    for (let k = 0; k < players.length; k++) {
        if (holds[i][0] == players[k].replace(/.+-(.+)/g, '$1')) {
            holds[i][2] = ++count
        }
    }
}
holds.map(a => a[3] = +(a[1] / a[2]).toFixed(2))

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

    if (holds.map(a => a[0]).includes(players[i].replace(/.+-(.+)/g, '$1'))) {
        for (let k = 0; k < holds.length; k++) {
            if (holds[k][0] == players[i].replace(/.+-(.+)/g, '$1')) {
                scores[i][4] = holds[k][3]
            }
        }
    } else {
        scores[i][4] = 0
    }
}
scores.map(a => a.push(a[1] + a[3] * 25 + a[4]))
scores = scores.sort(function (a, b) {
    if (b[5] < a[5]) return -1
    if (b[5] > a[5]) return 1
    return 0
})

let x = scores.slice(0)

let a = x.reduce((j, k) => j + k[1], 0)
let b = x.reduce((j, k) => j + k[2], 0)
let c = x.reduce((j, k) => j + k[3], 0)
let d = x.reduce((j, k) => j + k[4], 0)
let e = x.reduce((j, k) => j + k[5], 0)

scores = scores.map(a => a = { 'name': a[0].replace(/(.+)-.+/, '$1'), 'guild': a[0].replace(/.+-(.+)/, '$1'), 'killed': a[1], 'died': a[2], 'Emp destroyed': a[3], 'holds/members': a[4], 'total points': +a[5].toFixed(2) })

let set = new Set(scores.map(a => a.guild))
let setArr = [...set]
let itog = []
for (let k = 0; k < setArr.length; k++) {
    let count = 0
    for (let i = 0; i < scores.length; i++) {
        if (setArr[k] == scores[i]['guild']) {
            count += scores[i]['total points']

            itog[k] = [setArr[k], count.toFixed(0)]
        }
    }
}

scores.push({ 'name': null, 'guild': null, 'killed': a, 'died': b, 'Emp destroyed': c, 'holds/members': Math.round(+d), 'total points': Math.round(+e) })

console.table(scores)
console.log(`%c${itog.sort((a, b) => {
    if (+a[1] < +b[1]) return 1
    if (+a[1] > +b[1]) return -1
    return 0
}).map(a => a.join(' - ')).join('\n')}`, 'color: #bada55')