let elu = {
    main: 'with qElu:',
    upChance: [75, 65, 55, 45, 35],
}
let qElu = {
    main: 'without qElu:',
    upChance: [100, 90, 80, 70, 60],
}

modUp(10000) // кальк модификации МОДами

function modUp(x) {

    let options = elu

    for (let n = 0; n < 2; n++) {
        let k = 0
        let arr = []

        while (k < x) {
            let m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0
            let lvl = 0

            for (let i = 1; i < 100; i++) {
                if (lvl == 0) {
                    if (Math.floor(Math.random() * 1000) < options.upChance[0] * 10 + 1) {
                        lvl++
                        m1++
                        continue
                    }
                    m1++
                    continue
                }
                if (lvl == 1) {
                    if (Math.floor(Math.random() * 1000) < options.upChance[1] * 10 + 1) {
                        lvl++
                        m2++
                        continue
                    }
                    m2++
                    continue
                }
                if (lvl == 2) {
                    if (Math.floor(Math.random() * 1000) < options.upChance[2] * 10 + 1) {
                        lvl++
                        m3++
                        continue;
                    }
                    m3++
                    continue;
                }
                if (lvl == 3) {
                    if (Math.floor(Math.random() * 1000) < options.upChance[3] * 10 + 1) {
                        lvl++
                        m4++
                        continue;
                    }
                    m4++
                    continue;
                }
                if (lvl == 4) {
                    if (Math.floor(Math.random() * 1000) < options.upChance[4] * 10 + 1) {
                        lvl++
                        m5++
                        continue;
                    }
                    m5++
                    continue;
                }
                if (lvl == 5) {
                    arr.push(m1 + m2 * 2 + m3 * 4 + m4 * 8 + m5 * 16)
                    break
                }
            }
            k++
        }
        let averageValue = arr.reduce((a, b) => a + b) / x
        console.log(`${options.main} (min= ${Math.min(...arr)}; max= ${Math.max(...arr)}); average= ${averageValue}`)
        options = qElu
    }
}
