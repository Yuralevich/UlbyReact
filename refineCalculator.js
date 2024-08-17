let elu = {
    main: 'with qElu:',                     // настройки для заточки без квалити элу
    maxRefine: 10,                          // максимальный уровень заточки, можно расчитывать до +20 и т.д
    upChance: [10, 5, 4, 3, 2, 1],          // шансы на ап для +0, +1,...последняя цифра - для +6 и выше
    downChance: [10, 5, 4, 3, 2, 1],        // шансы на откат для +0, +1,...последняя цифра - для +6 и выше
    bonus300: 1,                            // 1 - on, 0 - off бонус за каждые 300 итерации понижает шанс отката на 10%
    noUpNoDownBonus: 1,                     // бонус +1% к шансу заточки\отката после пустой итерации
}
let qElu = {
    main: 'without qElu:',                  // настройки для заточки с использованием квалити элу
    maxRefine: 10,
    upChance: [15, 10, 9, 8, 7, 6],
    downChance: [7.5, 5, 4.5, 4, 3.5, 3],
    bonus300: 1,
    noUpNoDownBonus: 1,
}

refine(10000);                              // (число) - кол-во итераций в прогоне, больше 100000 не стоит ставить

function refine(x) {
    let options = elu

    for (let n = 0; n < 2; n++) {
        let k = 0;
        let arr = [];

        while (k < x) {
            let iterations = 0;
            let noUpNoDownCount = 0;
            let refine = 0;
            let bonus300 = 0

            for (let i = 1; i < Infinity; i++) {
                if (options.bonus300) bonus300 = Math.floor(i / 300)

                if (refine == 0) {

                    if (Math.floor(Math.random() * 1000) < (options.downChance[0] * 10 + 1 + noUpNoDownCount * 10 - bonus300 * 10)) {
                        refine = 0;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (Math.floor(Math.random() * 1000) < options.upChance[0] * 10 + 1 + noUpNoDownCount * 10) {
                        refine++;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (options.noUpNoDownBonus) noUpNoDownCount++
                }

                if (refine == 1) {

                    if (Math.floor(Math.random() * 1000) < (options.downChance[1] * 10 + 1 + noUpNoDownCount * 10 - bonus300 * 10)) {
                        refine--;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (Math.floor(Math.random() * 1000) < options.upChance[1] * 10 + 1 + noUpNoDownCount * 10) {
                        refine++;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (options.noUpNoDownBonus) noUpNoDownCount++
                }

                if (refine == 2) {

                    if (Math.floor(Math.random() * 1000) < (options.downChance[2] * 10 + 1 + noUpNoDownCount * 10 - bonus300 * 10)) {
                        refine--;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (Math.floor(Math.random() * 1000) < options.upChance[2] * 10 + 1 + noUpNoDownCount * 10) {
                        refine++;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (options.noUpNoDownBonus) noUpNoDownCount++
                }

                if (refine == 3) {

                    if (Math.floor(Math.random() * 1000) < (options.downChance[3] * 10 + 1 + + noUpNoDownCount * 10 - bonus300 * 10)) {
                        refine--;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (Math.floor(Math.random() * 1000) < options.upChance[3] * 10 + 1 + noUpNoDownCount * 10) {
                        refine++;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (options.noUpNoDownBonus) noUpNoDownCount++
                }

                if (refine == 4) {

                    if (Math.floor(Math.random() * 1000) < (options.downChance[4] * 10 + 1 + + noUpNoDownCount * 10 - bonus300 * 10)) {
                        refine--;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (Math.floor(Math.random() * 1000) < options.upChance[4] * 10 + 1 + noUpNoDownCount * 10) {
                        refine++;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (options.noUpNoDownBonus) noUpNoDownCount++
                }

                if (refine >= 5) {
                    if (Math.floor(Math.random() * 1000) < (options.downChance[5] * 10 + 1 + + noUpNoDownCount * 10 - bonus300 * 10)) {
                        refine--;
                        noUpNoDownCount = 0
                        continue;
                    }
                    if (Math.floor(Math.random() * 1000) < options.upChance[5] * 10 + 1 + noUpNoDownCount * 10) {
                        refine++;
                        noUpNoDownCount = 0
                        if (refine == options.maxRefine) {
                            iterations = i;
                            arr.push(iterations);
                            break;
                        }
                        continue;
                    }

                    if (options.noUpNoDownBonus) noUpNoDownCount++
                }
            }
            k++;
        }
        let averageValue = arr.reduce((a, b) => a + b) / x;
        console.log(`${options.main} (min= ${Math.min(...arr)}; max= ${Math.max(...arr)}); average= ${averageValue}`)
        options = qElu
    }
}


// let elu = {
//     main: 'with qElu:',
//     upChance: [75, 65, 55, 45, 35],
// }
// let qElu = {
//     main: 'without qElu:',
//     upChance: [100, 90, 80, 70, 60],
// }

// modUp(10000) // кальк модификации МОДами

// function modUp(x) {

//     let options = elu

//     for (let n = 0; n < 2; n++) {
//         let k = 0
//         let arr = []

//         while (k < x) {
//             let m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0
//             let lvl = 0

//             for (let i = 1; i < 100; i++) {
//                 if (lvl == 0) {
//                     if (Math.floor(Math.random() * 1000) < options.upChance[0] * 10 + 1) {
//                         lvl++
//                         m1++
//                         continue
//                     }
//                     m1++
//                     continue
//                 }
//                 if (lvl == 1) {
//                     if (Math.floor(Math.random() * 1000) < options.upChance[1] * 10 + 1) {
//                         lvl++
//                         m2++
//                         continue
//                     }
//                     m2++
//                     continue
//                 }
//                 if (lvl == 2) {
//                     if (Math.floor(Math.random() * 1000) < options.upChance[2] * 10 + 1) {
//                         lvl++
//                         m3++
//                         continue;
//                     }
//                     m3++
//                     continue;
//                 }
//                 if (lvl == 3) {
//                     if (Math.floor(Math.random() * 1000) < options.upChance[3] * 10 + 1) {
//                         lvl++
//                         m4++
//                         continue;
//                     }
//                     m4++
//                     continue;
//                 }
//                 if (lvl == 4) {
//                     if (Math.floor(Math.random() * 1000) < options.upChance[4] * 10 + 1) {
//                         lvl++
//                         m5++
//                         continue;
//                     }
//                     m5++
//                     continue;
//                 }
//                 if (lvl == 5) {
//                     arr.push(m1 + m2 * 2 + m3 * 4 + m4 * 8 + m5 * 16)
//                     break
//                 }
//             }
//             k++
//         }
//         let averageValue = arr.reduce((a, b) => a + b) / x
//         console.log(`${options.main} (min= ${Math.min(...arr)}; max= ${Math.max(...arr)}); average= ${averageValue}`)
//         options = qElu
//     }
// }
