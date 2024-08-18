let dmg = 100
let res = {
    'noCrit': null,
    'crit 1x': null,
    'crit 1.5x': null,
    'crit 2x': null,
    'crit 2.5x': null,
}
function critCalc(critChance) {

    let noCritObj = {}
    for (let def = 0; def <= 7; def++) {
        noCritObj[`${def * 10} def`] = dmg * (100 - def * 10) / 100 + ''
    }
    res.noCrit = noCritObj

    for (let mul = 0; mul <= 1.5; mul += 0.5) {
        let critObj = {}
        for (let def = 0; def <= 7; def++) {
            critObj[`${def * 10} def`] =
                `${parseInt((dmg * (1 + mul) * critChance + dmg * (1 - critChance)) * (100 - def * 10) / 100)}`
            res[`crit ${mul + 1}x`] = critObj
        }

    }
    console.table(res)
    console.log('Crit Chance:', critChance * 100, '% NON Ignor def mode. 100 base DMG')

}

critCalc(1)
critCalc(0.75)
critCalc(0.5)
critCalc(0.25) 