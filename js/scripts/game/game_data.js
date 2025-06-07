let dt = require("luxon").DateTime
// let dt = dv.luxon.DateTime

let data = {
    "bh3": {
        "超弦空间": {
            start_time_1: dt.fromObject({ weekday: 1, hour: 15 }),
            finish_time_1: dt.fromObject({ weekday: 3, hour: 22 })
        }
    },
    "genshin": {
        "马斯克礁": {
            start_time_1: dt.fromObject({ weekday: 1, hour: 4 }),
            finish_time_1: dt.fromObject({ weekday: 1, hour: 6 })
        }
    }

}

function getNextSettlementTime_BH3(name){
    let d=data["bh3"][name]
    return dt.now()
}

function getNextSettlementTime_GENSHIN(name) {
    let d = data["genshin"][name]

}

function getNextSettlementTime(name) {
    switch(name){
        case "bh3":
            return getNextSettlementTime_BH3(name)

        case "genshin":
            return getNextSettlementTime_GENSHIN(name)

        default:
            console.warn("Unknown game name:", name);
    }

    return null;
}

export default { getNextSettlementTime };