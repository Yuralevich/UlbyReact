
let fs = require('fs');

let strInfo = fs.readFileSync('itemInfoFORcode.txt', 'utf8').replace(/\r+/g, '')
    .replace(/\[(\d+)\] = \{/g, '$ $1[$1] = {').match(/\$ \d+\[\d+\] = \{[^\$]*/g)

let arrInfo = strInfo.map(a => {
    return [[a.replace(/\$ (\d+)\[\d+\] = \{[^\$]*/g, '$1')],
    [a.replace(/\$ \d+(\[\d+\] = \{[^\$]*)/g, '$1')]]
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////

let strSkills = fs.readFileSync('IDskillsDbFORcode.txt', 'utf8').replace(/\r+/g, '')
    .replace(/-(?= Id: \d+)/g, '$').replace(/\$ (Id: \d+)[^\$]*(Name: \w+)[^\$]*(Description: .+)[^\$]*/g, '$1\n$2\n$3')
    .replace(/Id: (\d+)/g, '$ $1').replace(/\"/g, '').match(/\$ \d+[^\$]*/g)

let arrSkillsId = strSkills.map(a => {
    return [[a.replace(/\$ (\d+)[^\$]*/g, '$1')], [a.replace(/\$[^\$]*Name: (\w+)[^\$]*/g, '$1')], [a.replace(/\$[^\$]*Description: ([^\$]*)/g, '$1')]]
})

/////////////////////////////////////////////////обработка БД ВСЕХ итемов СКРО///////////////////////////////

let strItemsId = fs.readFileSync('itemsSCROallFORcode.txt', 'utf8').replace(/\r+/g, '')
    .replace(/-(?= Id: \d+)/g, '$').replace(/\$ (Id: \d+)[^\$]*(\bName: [^\n\r]+)[^\$]*/g, '$1\n$2')
    .replace(/Id: (\d+)/g, '$ $1').replace(/\"/g, '').match(/\$ \d+[^\$]*/g)

let arrItemsId = strItemsId.map(a => {
    return [[a.replace(/\$ (\d+)[^\$]*/g, '$1')], [a.replace(/\$[^\$]*\bName: ([^\$]*)/g, '$1')]]
})
/////  [ [ '599' ], [ 'Light Orange Potion' ] ]
/////////////////////////////////////////////////////////////////////////////////////////////////////////
let strEquipScRo = fs.readFileSync('equipDBscROFORcode.txt', 'utf8').replace(/\r+/g, '').replace(/\\/g, '')

let strEquipScRoForAll = strEquipScRo.replace(/-(?= Id: \d+)/g, '$').match(/\$ Id: \d+[^\$]*\bScript: \|[^\$]*\b\w+[^\$]*/g)
    .map(a => a = a.replace(/(\$ Id: \d+)[^\$]*(\bScript: \|[^\$]*)/g, '$1 $2')
        .replace(/\"/g, '').replace(/\bbonus\d? /g, ''))

let arrEquip = strEquipScRoForAll.map(a => {
    return [[a.replace(/\$ Id: (\d+)[^\$]*/g, '$1')], [a.replace(/\$[^\$]*\bScript: \|([^\$]*)/g, '$1')]]
})
///////////////////////////////////////////////////////////////combo Equips///////////////////////////////////////
let comboEq = fs.readFileSync('comboEqupFORcode.txt', 'utf8').replace(/\r+/g, '')
    .replace(/- Combos:/g, '$').replace(/\"/g, '').replace(/\bbonus\d? /g, '').match(/\$[^\$]*/g)
let comboArrEq = comboEq.map(a => {
    return [[a.replace(/\$([^\$]*)   Script: \|[^\$]*/g, '$1').replace(/      - Combo:/g, '&').match(/\&[^\&]*/g,)],
    [a.replace(/\$[^\$]*   Script: \|([^\$]*)/g, '$1')]]
})
let finalComboArr = []
for (let i = 0; i < comboArrEq.length; i++) {
    for (let k = 0; k < comboArrEq[i][0][0].length; k++) {
        finalComboArr.push([comboArrEq[i][0][0][k].replace(/\&/g, '')
            .replace(/\b([\w\d']+)\b/g, '$1,')
            .replace(/[\s"-]/g, '')
            .replace(/,$/g, '')
            .replace(/,/g, ', ')
            .replace(/(.+)/g, '\n      "[^6666CC $1^000000 ]"'), comboArrEq[i][1][0]])
    }
}

////////////////////////////////////////////////генератор массива комбо для ЭКВИПА....//////////////////////////    
let strEquipScRoForCombo = strEquipScRo.replace(/-(?= Id: \d+)/g, '$').match(/\$[^\$]*/g)
    .map(a => a = a.replace(/(\$ Id: \d+)[^\$]*(AegisName: [\w\d']+\b)[^\$]/g, '$1 $2')
        .replace(/\"/g, ''))
let arrEquipForCombo = strEquipScRoForCombo.map(a => {
    return [[a.replace(/\$ Id: (\d+)[^\$]*/g, '$1')], [a.replace(/\$[^\$]*AegisName: ([\w\d']+\b)[^\$]*/g, '$1')]]
})
//console.log(arrEquipForCombo[8]) /////  [ [ '1135' ], [ 'Cutlas' ] ]
for (let i = 0; i < arrEquipForCombo.length; i++) {
    let rX = new RegExp('\\b' + arrEquipForCombo[i][1] + '\\b')
    for (let k = 0; k < finalComboArr.length; k++) {

        if (rX.test(finalComboArr[k][0])) {
            if (!arrEquipForCombo[i][2]) { arrEquipForCombo[i].push([]) }
            arrEquipForCombo[i][2].push(finalComboArr[k][0])
            arrEquipForCombo[i][2].push(finalComboArr[k][1])
            //console.log(arrEquipForCombo[i])
        }
    }
}
let arrComboEquip = arrEquipForCombo.filter(a => a.length > 2)
/////////////////////////////////////////////////БАЗА МОБОВ////////////////////////////////
let strMobs = fs.readFileSync('MobDBFORcode.txt', 'utf8').replace(/\r+/g, '')
    .replace(/-(?= Id: \d+)/g, '$').replace(/\$ (Id: \d+)[^\$]*\b(Name: [^\n\r]+)[^\$]*/g, '$1\n$2')
    .replace(/Id: (\d+)/g, '$ $1').replace(/\"/g, '').match(/\$ \d+[^\$]*/g)

let arrMobsId = strMobs.map(a => {
    return [[a.replace(/\$ (\d+)[^\$]*/g, '$1')], [a.replace(/\$[^\$]*\bName: ([^\$]*)/g, '$1')]]
})
///////////////////////////////[ [ '1004' ], [ 'Hornet' ] ]//////////////////////////
//////////////////////////////////////////////////////////////////блок подготовки текста//////////////////////////
function replacer(str) {
    return str
        .replace(/\r+/g, '')
        .replace(/,\{ specialeffect[^\}]*\}/g, '')
        .replace(/;/g, ';\n     ')
        .replace(/\belse if\b/gi, 'if')
        .replace(/(\bif\([^\{]+?\)) {/g, '"$1",\n     ')
        .replace(/(\bif\([^\{]+?\)){/g, '"$1",\n     ')
        .replace(/      } "/g, '      "')
        .replace(/      ([^;"]+?);/g, '      "$1",')

        .replace(/     }  ([^;"]+?);/g, '      "$1",')
        .replace(/("\bif\([^",]+\)) ([^"><=]+)"/g, '$1",\n      "$2"')
        .replace(/      (if\([^"]+\)",)/g, '      "$1')
        .replace(/,\n      }/g, ',')
        .replace(/\bautobonus\d? { /g, '"Gives a chance for:",\n      "').replace(/""/g, '"')
        .replace(/;/g, '",')
        .replace(/     (\b\w+[^;"]+?",)/g, '      "$1')

        ////////////////////////////////// перевод ntrcnf в пользовательский вид...................///////////////
        .replace(/"},[\w\+\*\-\/\(\) ]+, ?(\d+), ?([^,]+)"/g, (a, b, c) => {
            if (c == 0 || c == 'BF_WEAPON') { return `"(for ${b / 1000} sec when you hit)"` }
            return `"(for ${b / 1000} sec)"`
        })
        // .replace(/Size_All/g, 'Size_All size')
        // .replace(/Ele_All/g, 'Ele_All elements')
        .replace(/getrefine\(\)/g, 'Refine')
        .replace(/getequiprefine\w+\(\w+\)/g, 'Refine')
        .replace(/"[^"]*\bb(\w\w)RegenRate, ?(-?\d+), ?(\d+)"/g, (a, b, c, d) => `"+${c} ${b} every ${d / 1000} sec"`)
        .replace(/"[^"]*\bbNo(\w+)Damage, ?(\d+)"/g, `"$2% reduction $1Dmg"`)
        .replace(/"[^"]*\bbUnbreakable\w+, ?\d+"/g, `"Unbreakable"`)
        .replace(/"[^"]*\bbDoubleRate, ?(\d+)"/g, `"DoubleAttack chance = $1%"`)
        .replace(/"[^"]*\bbFlee, ?(-?\d+)"/g, (a, b) => `"Flee +${b}"`)
        .replace(/"[^"]*\bb(Max\w\w)rate, ?(-?\d+)"/gi, `"$1 +$2%"`)
        .replace(/"[^"]*\bb(Max\w\w)rate, ?([\w\+\*\-\/\(\) ]+)"/gi, `"$1 +($2)%"`)
        .replace(/"[^"]*\bbMatkRate, ?(\w\w\w\(\d+,[\w\+\*\-\/\(\) ]+\))"/gi, `"MATK +($1)%"`)
        .replace(/"[^"]*\bb(Max\w\w), ?(-?\d+)"/g, '"$1 +$2"')
        .replace(/"[^"]*\bb(Max\w\w), ?([\w\+\*\-\/\(\) ]+)"/g, '"$1 +($2)"')
        .replace(/"[^"]*\bbUseSPrate, ?(-?\d+)"/g, '"SP cost +$1%"')
        .replace(/"[^"]*\bbUseSPrate, ?([\w\+\*\-\/\(\) ]+)"/g, '"SP cost +($1)%"')
        .replace(/"[^"]*\bb(\w+)"/g, '"$1"')
        .replace(/"[^"]*\bb(\D{3,4}), ?(-?\d+)"/g, (a, b, c) => `"${b.toUpperCase()} +${c}"`)
        .replace(/"[^"]*\bb(\D{3,4}), ?([\w\+\*\-\/\(\) ]+)"/g, (a, b, c) => `"${b.toUpperCase()} +(${c})"`)
        .replace(/"[^"]*\bb(\D{5,6}), ?(-?\d+)"/g, (a, b, c) => `"${b} +${c}"`)
        .replace(/"[^"]*\bbBaseAtk, ?(-?\d+)"/g, '"ATK +$1"')
        .replace(/"[^"]*\bbCritical, ?(-?\d+)"/g, '"Crit +$1"')
        .replace(/"[^"]*\bbCriticalLong, ?(-?\d+)"/g, '"Ranged Crit +$1"')
        .replace(/"[^"]*\bbCritical, ?([\w\+\*\-\/\(\) ]+)"/g, '"Crit +($1)"')
        .replace(/"[^"]*\bbAspdRate, ?(-?\d+)"/g, '"AttackSpeed +$1%"')
        .replace(/"[^"]*\bbAspdRate, ?([\w\+\*\-\/\(\) ]+)"/g, '"AttackSpeed +($1)%"')
        .replace(/"[^"]*\bbSpeedRate, ?(-?\d+)"/g, '"MoveSpeed +$1%"')
        .replace(/"[^"]*\bbLongAtkRate, ?(-?\d+)"/g, '"Ranged ATK +$1%"')
        .replace(/"[^"]*\bbLongAtkDef, ?(-?\d+)"/g, '"Resist Ranged ATK +$1%"')
        .replace(/"[^"]*\bbMagicAtkDef, ?(-?\d+)"/g, '"Resist Magical ATK +$1% "')
        .replace(/"[^"]*\bbNearAtkDef, ?(-?\d+)"/g, '" Resist Melee ATK +$1%"')
        .replace(/"[^"]*\bbMagicAtkEle, ?Ele_(\w+), ?(-?\d+)"/g, '"$1 Magic +$2%"')
        .replace(/"[^"]*\bbCastrate, ?(-?\d+)"/gi, '"CastTime +$1%"')
        .replace(/"[^"]*\bbCastrate, ?([\w\+\*\-\/\(\) ]+)"/gi, '"CastTime +($1)%"')
        .replace(/"[^"]*\bbCastrate, ?(\w+), ?(-?\d+)"/gi, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"CastTime ^009900${b}^000000 +${c}%"`
                }
            }
        })
        .replace(/"[^"]*\bbDelayrate, ?(-?\d+)"/gi, '"Delay +$1%"')
        .replace(/"[^"]*\bbDelayrate, ?([\w\+\*\-\/\(\) ]+)"/gi, '"Delay +($1)%"')
        .replace(/"[^"]*\bb(\w\w)recovRate, ?(-?\d+)"/g, '"$1 Recovery +$2%"')
        .replace(/"[^"]*\bbAutoSpell, ?(\w+), ?(\d+), ?(\d+)"/g, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"${d / 10}% ^009900${b}^000000 ${c} lvl",\n      "(When you hit)"`
                }
            }
        }) //'"$3.$4% ^009900$1^000000 $2 lvl",\      "(When you hit)"')
        .replace(/"[^"]*\bbAutoSpell, ?(\w+), ?(\d+), ?([\w\+\*\-\/\(\)>=< ]+)"/g, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"(${d})/10% ^009900${b}^000000 ${c} lvl",\n      "(When you hit)"`
                }
            }
        }) //'"$3.$4% ^009900$1^000000 $2 lvl",\      "(When you hit)"')
        .replace(/"[^"]*\bbAutoSpell, ?(\w+), ?(\d+), ?(\d+),BF_(\w+)(,\d)?"/g, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"${d / 10}% ^009900${b}^000000 ${c} lvl",\n        "(When you ${e} hit)"`
                }
            }
        })
        .replace(/"[^"]*\bbAutoSpell, ?(\w+),getskilllv\((\w+)\), ?(\d+),BF_(\w+)(,\d)?"/gi, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    c = arrSkillsId.filter(a => a[1] == c)[0][2]
                    return `"${d / 10}% ^009900${b}^000000 (${c}) lvl",\n        "(When you ${e} hit)"`

                }
            }
        })
        .replace(/"[^"]*\bbAutoSpell, ?(\w+), ?(\d+),-(\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"Disables Auto-^009900${b}^000000"`
                }
            }
        }) //'"Disables Auto-^009900$1^000000"')
        .replace(/"[^"]*\bbAutoSpell, ?(\w+),getskilllv\((\w+)\), ?(\d+)(,\d)?"/gi, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    c = arrSkillsId.filter(a => a[1] == c)[0][2]
                    return `"${d / 10}% ^009900${b}^000000 (${c}) lvl",\n      "(When you hit)"`

                }
            }
        })
        .replace(/"[^"]*\bbAutoSpell, ?(\w+), ?([\w\+\*\-\/\(\) ]+), ?(\d+)(,\d)?"/g, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"${d / 10}% ^009900${b}^000000 (${c}) lvl",\n      "(When you hit)"`
                }
            }
        })
        .replace(/"[^"]*\bbAutoSpell, ?(\w+), ?(\w\w\w\([\^\w\+\*\-\/\(\) ]+,\d+\)), ?(\d+)"/gi, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"${d / 10}% ^009900${b}^000000 (${c}) lvl",\n        "(When you hit)"`
                }
            }
        })
        .replace(/"[^"]*\bbAutoSpellWhenHit, ?(\w+), ?(\d+), ?(\d+)(,\d)?"/g, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"${d / 10}% ^009900${b}^000000 ${c} lvl",\n      "(When enemy hit)"`
                }
            }
        }) //'"$3.$4% $1 $2 lvl",\n        "(When you hit)"')

        .replace(/"[^"]*\bbAutoSpellWhenHit, ?(\w+), ?(\d+), ?(\d+),BF_(\w+)(,\d)?"/g, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"${d / 10}% ^009900${b}^000000 ${c} lvl",\n        "(When enemy ${e} hit)"`
                }
            }
        })
        .replace(/"[^"]*\bbAutoSpellWhenHit, ?(\w+),getskilllv\((\w+)\), ?(\d+),BF_(\w+)(,\d)?"/gi, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    c = arrSkillsId.filter(a => a[1] == c)[0][2]
                    return `"${d / 10}% ^009900${b}^000000 (${c}) lvl",\n        "(When enemy ${e} hit)"`

                }
            }
        })
        .replace(/"[^"]*\bbAutoSpellWhenHit, ?(\w+),getskilllv\((\w+)\), ?(\d+)(,\d)?"/gi, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    c = arrSkillsId.filter(a => a[1] == c)[0][2]
                    return `"${d / 10}% ^009900${b}^000000 (${c}) lvl",\n        "(When enemy hit)"`

                }
            }
        })
        .replace(/"[^"]*\bbAutoSpellWhenHit, ?(\w+), ?(\w\w\w\(\d+,[\^\w\+\*\-\/\(\) ]+\)), ?(\d+)"/gi, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"${d / 10}% ^009900${b}^000000 (${c}) lvl",\n        "(When enemy hit)"`
                }
            }
        })
        .replace(/"[^"]*\bbAutoSpellWhenHit, ?(\w+), ?(\d+), ?([\^\w\+\*\-\/\(\) ]+)"/gi, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"(${d})/10% ^009900${b}^000000 ${c} lvl",\n        "(When enemy hit)"`
                }
            }
        })
        .replace(/"[^"]*\bbAutoSpellOnSkill, ?(\w+), ?(\w+), ?(\d+), ?(\d+)(,\d)?"/gi, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    for (let k = 0; k < arrSkillsId.length; k++) {
                        if (c == arrSkillsId[k][1]) {
                            c = arrSkillsId[k][2]
                            return `"${e / 10}% ^009900${c}^000000 ${d} lvl",\n      "(When use ^009900${b}^000000)"`
                        }
                    }
                }
            }
        })
        .replace(/"[^"]*\bbAutoSpellOnSkill, ?(\w+), ?(\w+), ?(\w\w\w\([\^\w\+\*\-\/\(\) ]+,\d+\)), ?(\d+)"/gi, (a, b, c, d, e) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    for (let k = 0; k < arrSkillsId.length; k++) {
                        if (c == arrSkillsId[k][1]) {
                            c = arrSkillsId[k][2]
                            return `"${e / 10}% ^009900${c}^000000 ${d} lvl",\n      "(When use ^009900${b}^000000)"`
                        }
                    }
                }
            }
        })

        .replace(/ ?\|\| ?/g, ', ').replace(/ ?&& ?/g, ' and ')
        .replace(/"[^"]*if \(([^"]*)\)( \{)?"/g, '"[ ^009900$1^000000 ]"')
        .replace(/"[^"]*if\(([^"]*)\)( \{)?"/g, '"[ ^009900$1^000000 ]"')
        .replace(/\belse\b/g, '[ ^009900else^000000 ]')
        .replace(/BaseJob ?== ?Job_(\w+\b)/g, '$1')
        .replace(/readparam\(b(\w+)\)(\D+)(\d+)/g, '$1 $2 $3')
        .replace(/BaseClass ?== ?Job_(\w+\b)/g, '$1')
        .replace(/\(?Class ?== ?Job_(\w+\b)\)?/g, '$1')
        .replace(/getskilllv\((\w+)\)(\^000000)/gi, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `${b} lvl => 1${c}`
                }
            }
        })
        .replace(/getskilllv\((\w+)\) ?([><=]+) ?(\d+)/gi, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `${b} ${c} ${d} lvl`
                }
            }
        }) //'if $1 $2 $3 lvl')
        .replace(/"[^"]*\bbSkillAtk, ?(\D+), ?(-?\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"^009900${b}^000000 +${c}%"`
                }
            }
        }) //'"^009900$1^000000 +$2%"')
        .replace(/"[^"]*\bbSkillAtk, ?(\d+), ?(-?\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][0]) {
                    b = arrSkillsId[i][2]
                    return `"^009900${b}^000000 +${c}%"`
                }
            }
        }) //'"^009900$1^000000 +$2%"')
        .replace(/"[^"]*\bbSkillAtk, ?(\d+), ?([\w\+\*\-\/\(\) ]+)"/g, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][0]) {
                    b = arrSkillsId[i][2]
                    return `"^009900${b}^000000 +(${c})%"`
                }
            }
        })
        .replace(/"[^"]*\bbSkillAtk, ?(\D+), ?([\w\+\*\-\/\(\) ]+)"/g, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"^009900${b}^000000 +(${c})%"`
                }
            }
        })
        .replace(/"[^"]*\bbAddSkillBlow, ?(\D+), ?(\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"Knock back ${c} cells",\n      "(When use ^009900${b}^000000)"`
                }
            }
        })
        .replace(/"[^"]*\bb(\w\w)DrainValue, ?(-?\d+)"/g, '"+$2 $1 when you hit"')
        .replace(/"[^"]*\bb(\w\w)DrainValueRace, ?RC_(\w+), ?(-?\d+)"/g, '"+$3 $1 when you hit $2"')
        .replace(/"[^"]*\bb(\w\w)DrainRate, ?(\d+), ?(\d+)"/g, (a, b, c, d) => `"${c / 10}% Drain ${d}% ${b}",\n      "(When you hit)"`)
        .replace(/"[^"]*\bbAddMonsterDropItem, ?(\d+),\d+"/g, (a, b) => {
            for (let i = 0; i < arrItemsId.length; i++) {
                if (b == arrItemsId[i][0]) {
                    b = arrItemsId[i][1]
                    return `"Can drop ^6666CC${b}^000000",\n      "(When you kill mob)"`
                }
            }
        })//`"Can drop ${b}",\n        "(When you kill mob)"`)
        .replace(/"[^"]*\bbAddMonsterDropItem, ?(\d+), ?RC_(\w+),\d+"/g, (a, b, c) => {
            for (let i = 0; i < arrItemsId.length; i++) {
                if (b == arrItemsId[i][0]) {
                    b = arrItemsId[i][1]
                    return `"Can drop ^6666CC${b}^000000",\n      "(When you kill ${c})"`
                }
            }
        })//'"Can drop $1",\n        "(When you kill $2)"')


        .replace(/"[^"]*\bbMagicDamageReturn, ?(\d+)"/g, '"Reflect Magic +$1%"')
        .replace(/"[^"]*\bbAddEffWhenHit, ?Eff_(\w+), ?(\d+)"/g, (a, b, c) => `"${c / 100}% ${b}",\n      "(When enemy hit)"`)
        .replace(/"[^"]*\bbAddEff, ?Eff_(\w+), ?(\d+)"/g, (a, b, c) => `"${c / 100}% ${b}",\n      "(When you hit)"`)
        .replace(/"[^"]*\bbAddEff, ?Eff_(\w+), ?(\d+),ATF_([\|\w]+)"/g, (a, b, c, d) => `"${c / 100}% ${b}",\n      "(When you hit)"`)
        .replace(/"[^"]*\bbAddEff2, ?Eff_(\w+), ?(\d+)"/g, (a, b, c) => `"${c / 100}% ${b} himself",\n      "(When you hit)"`)
        .replace(/"[^"]*\bbAddEle, ?Ele_(\w+), ?(\d+)"/g, '"ATK vs $1 +$2%"')
        .replace(/"[^"]*\bbMagicAddEle, ?Ele_(\w+), ?(\d+)"/g, '"MATK vs $1 +$2%"')
        .replace(/"[^"]*\bbResEff, ?Eff_(\w+), ?(\d+)"/g, (a, b, c) => `"Resist ${b} +${c / 100}%"`)
        .replace(/"[^"]*\bbResEff, ?Eff_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, (a, b, c) => `"Resist ${b} +(${c})/100%"`)
        .replace(/"[^"]*\bbPerfectHitAddRate, ?(\d+)"/g, '"Perfect Hit +$1"')
        .replace(/"[^"]*\bbNoGemStone(,\d+)?"/g, '"No GemStone"')
        .replace(/"[^"]*\bbIgnoreDefRaceRate, ?RC_(\w+), ?(-?\d+)"/g, '"Ignore $2% DEF vs $1"')
        .replace(/"[^"]*\bbIgnoreDefRaceRate, ?RC_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, '"Ignore ($2)% DEF vs $1"')
        .replace(/"[^"]*\bbIgnoreMdefRaceRate, ?RC_(\w+), ?(-?\d+)"/g, '"Ignore $2% MDEF vs $1"')
        .replace(/"[^"]*\bbIgnoreMdefRaceRate, ?RC_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, '"Ignore ($2)% MDEF vs $1"')
        .replace(/"[^"]*\bbIgnoreMdefClassRate, ?Class_(\w+), ?(-?\d+)"/g, '"Ignore $2% MDEF vs $1"')
        .replace(/"[^"]*\bbIgnoreMdefClassRate, ?Class_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, '"Ignore ($2)% MDEF vs $1"')
        .replace(/"[^"]*\bbExpAddRace, ?RC_(\w+), ?(\d+)"/g, '"EXP $1 +$2%"')
        .replace(/"[^"]*\bbComaRace, ?RC_(\w+), ?(\d+)"/g, (a, b, c) => `"${c / 100}% Coma",\n      "(When you hit ${b})"`)
        .replace(/"[^"]*\bbComaClass, ?Class_(\w+), ?(\d+)"/g, (a, b, c) => `"${c / 100}% Coma",\n      "(When you hit ${b})"`)
        .replace(/"[^"]*\bbSubRace, ?RC_(\w+), ?(-?\d+)"/g, '"Resist $1 +$2%"')
        .replace(/"[^"]*\bbSubRace, ?RC_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, '"Resist $1 +($2)%"')
        .replace(/"[^"]*\bbSubEle, ?Ele_(\w+), ?(-?\d+)"/g, '"Resist $1 +$2%"')
        .replace(/"[^"]*\bbSubEle, ?Ele_(\w+), ?(-?\d+),BF_(\w+)"/g, '"Resist $3 $1 +($2)%"')
        .replace(/"[^"]*\bbSubEle, ?Ele_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, '"Resist $1 +($2)%"')
        .replace(/"[^"]*\bbSubEle, ?Ele_(\w+), ?(\w\w\w\(\d+,[\w\+\*\-\/\(\) ]+\))"/g, '"Resist $1 +($2)%"')
        .replace(/"[^"]*\bbNoKnockback[^"]*"/g, '"NoKnockBack"')
        .replace(/"[^"]*\bbNoCastCancel[^"]*"/g, '"Uninteruptable Casting"')
        .replace(/"[^"]*\bbDef, ?([\w\+\*\-\/\(\)><]+)"/g, '"DEF +($1)"')
        .replace(/"[^"]*\bbDefEle, ?Ele_(\w+)"/g, '"ArmorElement: $1"')
        .replace(/"[^"]*\bb(\w\w)GainRace, ?RC_(\w+), ?(\d+)"/g, '"+$3 $1 for kill $2"')
        .replace(/"[^"]*\bb(\w\w)GainValue, ?(\d+)"/g, '"+$2 $1 for melee kill"')
        .replace(/"[^"]*\bb(\w\w)LongGainValue, ?(\d+)"/g, '"+$2 $1 for range kill"')
        .replace(/"[^"]*\bb(\w\w)MagicGainValue, ?(\d+)"/g, '"+$2 $1 for magic kill"')
        .replace(/"[^"]*\bbAddRace, ?RC_(\w+), ?(-?\w+)"/g, '"ATK vs $1 +$2%"')
        .replace(/"[^"]*\bbAddRace, ?RC_(\w+), ?(-?\d+)"/g, '"Resist $1 +$2%"')
        .replace(/"[^"]*\bbAddRace, ?RC_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, '"Resist $1 +($2)%"')
        .replace(/"[^"]*\bskill (\w+), ?(\d+)"/gi, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"^009900${b}^000000 ${c} lvl"`
                }
            }
        })/////////////////////'"^009900$1^000000 $2 lvl"')
        .replace(/"[^"]*\bbAddEffOnSkill, ?(\w+), ?Eff_(\w+), ?(\d+)"/gi, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"${d / 100}% for ${c}",\n      "(When use ^009900${b}^000000)"`
                }
            }
        })
        .replace(/"[^"]*\bbAddEffOnSkill, ?(\w+), ?Eff_(\w+), ?([\w\+\*\-\/\(\) ]+)"/gi, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"(${d})/100% for ${c}",\n      "(When use ^009900${b}^000000)"`
                }
            }
        })
        .replace(/"[^"]*\bbCritAtkRate, ?(\d+)"/gi, '"Crit Damage +$1%"')
        .replace(/"[^"]*\bbCritAtkRate, ?([\w\+\*\-\/\(\) ]+)"/gi, '"Crit Damage +($1)%"')
        .replace(/"[^"]*\bbPerfectHitRate, ?(-?\d+)"/g, '"Perfect Hit +$1%"')
        .replace(/"[^"]*\bbAtkEle, ?Ele_\w+",/g, '')
        .replace(/"[^"]*\bbIgnoreDefRace, ?RC_(\w+)"/g, '"Ignore DEF vs $1"')
        .replace(/"[^"]*\bbIgnoreDefClass, ?Class_(\w+)"/g, '"Ignore DEF vs $1"')
        .replace(/"[^"]*\bb(\w\w)LossRate, ?(\d+), ?(\d+)"/g, (a, b, c, d) => `"-${c} ${b} every ${d / 1000} sec"`)
        .replace(/"[^"]*\bbSubClass, ?Class_(\w+), ?(-?\d+)"/g, '"Resist vs $1 +$2%"')
        .replace(/"[^"]*\bbSubSize, ?Size_(\w+), ?(-?\d+)"/g, '"Resist vs $1 +$2%"')
        .replace(/"[^"]*\bbSubSize, ?Size_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, '"Resist vs $1 +($2)%"')
        .replace(/"[^"]*\bbAddClass, ?Class_(\w+), ?(-?\d+)"/g, '"ATK vs $1 +$2%"')
        .replace(/"[^"]*\bbMagicAddRace, ?RC_(\w+), ?(-?\d+)"/g, '"MATK vs $1 +$2%"')
        .replace(/"[^"]*\bbMagicAddRace, ?RC_(\w+), ?([\w\+\*\-\/\(\) ]+)"/g, '"MATK vs $1 +($2)%"')
        .replace(/"[^"]*\bbAllStats, ?(-?\d+)"/g, '"AllStats +$1"')
        .replace(/"[^"]*\bb(\w\w)VanishRate, ?(-?\d+), ?(-?\d+)"/g, (a, b, c, d) => `"${c / 10}% Drain ${d}% ${b}"`)
        .replace(/"[^"]*\bbCriticalAddRace, ?RC_(\w+), ?(-?\d+)"/gi, '"Crit vs $1 +$2"')
        .replace(/"[^"]*\bbBreak(\w+)Rate, ?(-?\d+)"/g, (a, b, c) => `"${c / 100}% Break ${b}"`)
        .replace(/"[^"]*\bbFlee2, ?(-?\d+)"/g, '"Perfect Dodge +$1"')
        .replace(/"[^"]*\bbFlee2, ?([\w\+\*\-\/\(\) ]+)"/g, '"Perfect Dodge +($1)"')
        .replace(/"[^"]*\bbDef2Rate, ?(-?\d+)"/g, '"VitDEF +$1%"')
        .replace(/"[^"]*\bbAddSize, ?Size_(\w+), ?(-?\d+)"/g, '"ATK vs $1 +$2%"')
        .replace(/"[^"]*\bbDefRatioAtkClass, ?Class_All"/g, `"Deals more damage depending on the target's Defense."`)
        .replace(/"[^"]*\bbClassChange,300"/g, `"Add a low chance of transforming all monsters, aside from Boss monsters, with each attack."`)
        .replace(/"[^"]*\bbAddItemGroupHealRate,IG_Potion, ?(\d+)"/g, '"Red, Yellow and White Potions +$1%"')
        .replace(/"[^"]*\bbAddMonsterDropItemGroup,IG_(\w+), ?(\d+)"/g, '"An enchanted sword that draws $1 out from fallen monsters."')
        .replace(/"[^"]*\bbHealPower, ?(-?\d+)"/g, '"HealPower +$1%"')
        .replace(/"[^"]*\bbHealPower, ?([\w\+\*\-\/\(\) ]+)"/g, '"HealPower +($1)%"')
        .replace(/"[^"]*\bbSkillHeal, ?(\D+), ?(-?\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"HealPower ^009900${b}^000000 +${c}%"`
                }
            }
        })
        .replace(/"[^"]*\bbSkillHeal2, ?(\D+), ?(-?\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `"HealPower ^009900${b}^000000 +${c}%",\n      "(Only for yourself)"`
                }
            }
        })
        .replace(/"[^"]*\bbAddItemHealRate, ?(-?\d+)"/g, '"HealPower of items +$1% "')
        .replace(/"[^"]*\bbShortWeaponDamageReturn, ?(-?\d+)"/g, '"Reflects $1% melee dmg"')
        .replace(/"[^"]*\bbShortWeaponDamageReturn, ?([\w\+\*\-\/\(\) ]+)"/g, '"Reflects ($1)% melee dmg"')
        .replace(/"[^"]*\bbAddDamageClass, ?(\d+), ?(-?\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrMobsId.length; i++) {
                if (b == arrMobsId[i][0]) {
                    b = arrMobsId[i][1]
                    return `"ATK vs ^CC0000${b}^000000 +${c}%"`
                }
            }
        })
        .replace(/"[^"]*\bbAddMagicDamageClass, ?(\d+), ?(-?\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrMobsId.length; i++) {
                if (b == arrMobsId[i][0]) {
                    b = arrMobsId[i][1]
                    return `"MATK vs ^CC0000${b}^000000 +${c}%"`
                }
            }
        })
        .replace(/"[^"]*\bbAddDefMonster, ?(\d+), ?(-?\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrMobsId.length; i++) {
                if (b == arrMobsId[i][0]) {
                    b = arrMobsId[i][1]
                    return `"DEF vs ^CC0000${b}^000000 +${c}%"`
                }
            }
        })
        .replace(/"[^"]*\bbAddMDefMonster, ?(\d+), ?(-?\d+)"/g, (a, b, c) => {
            for (let i = 0; i < arrMobsId.length; i++) {
                if (b == arrMobsId[i][0]) {
                    b = arrMobsId[i][1]
                    return `"MDEF vs ^CC0000${b}^000000 +${c}%"`
                }
            }
        })
        .replace(/"[^"]*\bbAddMonsterIdDropItem, ?(\d+), ?(\d+), ?(-?\d+)"/g, (a, b, c, d) => {
            for (let i = 0; i < arrMobsId.length; i++) {
                if (c == arrMobsId[i][0]) {
                    c = arrMobsId[i][1]
                    b = arrItemsId.filter(a => a[0] == b)[0][1]
                    return `"${d / 10}% ^6666CC${b}^000000",\n         "(When you kill ^CC0000${c}^000000)"`
                }
            }
        })

        .replace(/"} if\((Refine ?[><=]+ ?\d+)\)[^"]*/g, '"[ ^009900$1^000000 ]",\n      ')
        .replace(/\.0+(%)/g, '$1')
        .replace(/"[^"]*\bb(\D+)rate, ?(-?\d+)"/gi, (a, b, c) => `"${b.toUpperCase()} +${c}%"`)
        .replace(/"[^"]*\bb(\D+)rate, ?([\w\+\*\-\/\(\) ]+)"/gi, (a, b, c) => `"${b.toUpperCase()} +(${c})%"`)
        .replace(/\+\-/g, '-')
        .replace(/(\D)(\.\d)/g, '$10$2')
        .replace(/\bEquipScript: \|/g, '  "[ When equip ]",')
        .replace(/\bUnEquipScript: \|/g, '  "[ When unequip ]",')
        .replace(/      ",\n/g, '')
        .replace(/      }\n(      "=========================",)/g, '$1')
        .replace(/PLAYER_HUMAN/gi, 'Players')
        .replace(/==/g, '=')
        .replace(/     \n/g, '')
        .replace(/  ,\n/g, '')
        .replace(/"if ?\(([^\n]+)\)/g, '"[ ^009900$1^000000 ]",')
        .replace(/       /g, '      ')
        .replace(/         /g, '      ')
        .replace(/      "}\n/g, '')
        .replace(/ {\n        /g, '",\n      "')
        .replace(/\{/g, '')
        .replace(/\s+"(\s+)/g, '$1')
        .replace(/(009900\w\w\w ?[>=<]+)/g, (a, b) => `${a.toUpperCase()}`)
        .replace(/getskilllv\((\w+)\)/gi, (a, b, c, d) => {
            for (let i = 0; i < arrSkillsId.length; i++) {
                if (b == arrSkillsId[i][1]) {
                    b = arrSkillsId[i][2]
                    return `^009900${b}^000000 lvl`
                }
            }
        })
        .replace(/readparam\(b(\w\w\w)\)/g, (a, b) => `Base ${b.toUpperCase()}`)
        .replace(/ {0,2}([><=]+) {0,2}/g, ' $1 ')
        .replace(/\+\(-/g, '-(')
        .replace(/\(\(([^\)]+)\)\)/g, '($1)')
        .replace(/009900Divest/g, '009900Strip')



}
arrEquip.map(a => a[1] = [replacer(a[1][0])])
arrComboEquip.map(a => a[2] = [replacer(a[2].join())])
//////////////////////////////////////////////////////////////////////////////////////////  


for (let i = 0; i < arrInfo.length; i++) {
    let e = arrEquip.filter(a => a[0][0] == arrInfo[i][0][0])
    let c = arrComboEquip.filter(a => a[0][0] == arrInfo[i][0][0])
    if (!!e.length && !!c.length) {
        if (/"========================="/.test(arrInfo[i][1][0])) {
            let strFin = arrInfo[i][1][0]
                .replace(/(^[^$]*identifiedDescriptionName = {)[^$]*"=========================",[^$]*$/g, (a, b, c) => {
                    if (/"\^ff0000Character Item\^000000",/g.test(a)) { return a.replace(/(^[^$]*identifiedDescriptionName = {[^$]*?"\^ff0000Character Item\^000000",)[^$]*"=========================",[^$]*$/g, '$1') }
                    return b
                })
                + e[0][1][0] + '\n      "=========================",'
                + c[0][2][0]
                + arrInfo[i][1][0].replace(/^[^$]*(    "========================="[^$]*$)/g, '$1')
            arrInfo[i][1] = [strFin.replace(/\n\s*\n/g, '\n').replace(/          /g, '        ').replace(/      }\n(      "=========================",)/g, '$1')]
        } else {
            let strFin = arrInfo[i][1][0]
                .replace(/(^[^$]*identifiedDescriptionName = {)[^$]*$/g, '$1')
                + e[0][1][0] + '\n      "=========================",'
                + c[0][2][0] + '\n      "=========================",'
                + arrInfo[i][1][0].replace(/^[^$]*identifiedDescriptionName = {([^$]*)$/g, '$1')
            arrInfo[i][1] = [strFin.replace(/\n\s*\n/g, '\n').replace(/          /g, '        ').replace(/      }\n(      "=========================",)/g, '$1')]
        }
    } else if (!!e.length) {

        if (/"========================="/.test(arrInfo[i][1][0])) {
            let strFin = arrInfo[i][1][0]
                .replace(/(^[^$]*identifiedDescriptionName = {)[^$]*"=========================",[^$]*$/g, (a, b, c) => {
                    if (/"\^ff0000Character Item\^000000",/g.test(a)) { return a.replace(/(^[^$]*identifiedDescriptionName = {[^$]*?"\^ff0000Character Item\^000000",)[^$]*"=========================",[^$]*$/g, '$1') }
                    return b
                })
                + e[0][1][0]
                + arrInfo[i][1][0].replace(/^[^$]*(    "========================="[^$]*$)/g, '$1')
            arrInfo[i][1] = [strFin.replace(/\n\s*\n/g, '\n').replace(/          /g, '        ').replace(/      }\n(      "=========================",)/g, '$1')]
        } else {
            let strFin = arrInfo[i][1][0]
                .replace(/(^[^$]*identifiedDescriptionName = {)[^$]*$/g, '$1')
                + e[0][1][0] + '\n      "=========================",'
                + arrInfo[i][1][0].replace(/^[^$]*identifiedDescriptionName = {([^$]*)$/g, '$1')
            arrInfo[i][1] = [strFin.replace(/\n\s*\n/g, '\n').replace(/          /g, '        ').replace(/      }\n(      "=========================",)/g, '$1')]
        }
    } else if (!!c.length) {
        if (/"========================="/.test(arrInfo[i][1][0])) {
            let strFin = arrInfo[i][1][0]
                .replace(/(^[^$]*identifiedDescriptionName = {)[^$]*"=========================",[^$]*$/g, (a, b, c) => {
                    if (/"\^ff0000Character Item\^000000",/g.test(a)) { return a.replace(/(^[^$]*identifiedDescriptionName = {[^$]*?"\^ff0000Character Item\^000000",)[^$]*"=========================",[^$]*$/g, '$1') }
                    return b
                })
                + c[0][2][0]
                + arrInfo[i][1][0].replace(/^[^$]*(    "========================="[^$]*$)/g, '$1')
            arrInfo[i][1] = [strFin.replace(/\n\s*\n/g, '\n').replace(/          /g, '        ').replace(/      }\n(      "=========================",)/g, '$1')]
        } else {
            let strFin = arrInfo[i][1][0]
                .replace(/(^[^$]*identifiedDescriptionName = {)[^$]*$/g, '$1')
                + c[0][2][0] + '\n      "=========================",'
                + arrInfo[i][1][0].replace(/^[^$]*identifiedDescriptionName = {([^$]*)$/g, '$1')
            arrInfo[i][1] = [strFin.replace(/\n\s*\n/g, '\n').replace(/          /g, '        ').replace(/      }\n(      "=========================",)/g, '$1')]
        }
    }
}

arrInfo = arrInfo.map(a => a[1])
let stroka = `tbl = {
    ` + arrInfo.join('')
        .replace(/(\n)      (")/g, '$1        $2')
        .replace(/(\n)       (")/g, '$1        $2')
    + `
}
main = function()
    for ItemID,DESC in pairs(tbl) do
        result, msg = AddItem(ItemID, DESC.
unidentifiedDisplayName, DESC.
unidentifiedResourceName, DESC.identifiedDisplayName, DESC.identifiedResourceName, DESC.slotCount, DESC.ClassNum)
        if not result then
            return false, msg
        end
        for k,v in pairs(DESC.
unidentifiedDescriptionName) do
            result, msg = AddItemUnidentifiedDesc(ItemID, v)
            if not result then
                return false, msg
            end
        end
        for k,v in pairs(DESC.identifiedDescriptionName) do
            result, msg = AddItemIdentifiedDesc(ItemID, v)
            if not result then
                return false, msg
            end
        end
    end
    return true, "good"
    end`

let fw = require('fs');
date = new Date().toLocaleString().replace(/, /, '_').replace(/:/g, '-')
let file = 'ItemInfo_' + date + '.txt'
fw.writeFile(file, stroka, (err) => {
    if (err) throw err;
    console.log(`Данные сохранены в ${file}`);
});

//console.log(stroka)

