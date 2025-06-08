// let dt = require("luxon").DateTime
class GameTimeResolver {

    getNextSettlementTime(luxon, name) {        
        switch (name) {
            case "bh3":
                return this.getNextSettlementTime_BH3(name)

            case "genshin":
                return this.getNextSettlementTime_GENSHIN(name)

            default:
                return ("Unknown game name:" + name)
        }
    }

    getNextSettlementTime_BH3(luxon, name) {
        // let d = data["bh3"][name]
        const { time_util } = customJS
        let now = time_util.getCurrentTime()
        return now
    }

    getNextSettlementTime_GENSHIN(luxon, name) {
        const { time_util } = customJS
        let now = time_util.getCurrentTime()
        return now
        // let d = data["genshin"][name]
    }
}