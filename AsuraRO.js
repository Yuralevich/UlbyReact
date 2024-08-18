let ATK = 1000 * 1.62 * 1.2 // true sight 20% + rage potion 62%
let SP = 7000
let Skill_Lv = 5
let BaseLV = 50
let AsuraScRo = ((ATK * (1 + SP / 24) + (100 * Skill_Lv)) * BaseLV * 2) / 100
  * 1.4 * 1.2 * 1.15 // 2x hydra + turtle general + specialization

let titanResist = 10
let resistNeutral = 70  // 5 x 5% all + deviling 30% + 15% vali's
let resistSize = 25 // ench platinum shield 25%
let resistRace = 30 // thara frog 30% 
let ghostring = 70
let totalDmg = AsuraScRo * (100 - titanResist) * (100 - resistNeutral)
  * (100 - resistRace) * (100 - resistSize) * (100 - ghostring) / 100 ** 5

console.log(`В голого: %c${parseInt(AsuraScRo)}`, 'color:#bada55')
console.log(`В топ шмот: %c${parseInt(totalDmg)}`, 'color:orange')
console.log(`По сумке: %c${parseInt(0.7 * totalDmg)}`, 'color:red')