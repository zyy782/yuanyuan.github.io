let data = []  
let teams = []
let result = {}
for (const i in aa) {
    data.push(aa[i])
}

function res(team, name) {
    let flag = result
    let i;
    for (i = 0; i < team.length - 1; i++) {
        if (flag[team[i]] === undefined) {
            flag[team[i]] = {}
        }
        flag = flag[team[i]]
    }
    if (flag[team[i]] === undefined) {
        flag[team[i]] = [name]
    } else {
        flag[team[i]].push(name)
    }
}

for (let i = 0; i < data.length; i++) {
    teams = data[i].team.split('/')
    let aa = res(teams, data[i].name)
}
console.log(result)
