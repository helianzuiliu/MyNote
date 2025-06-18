// let dt = require("luxon").DateTime
class GameTimeResolver {

    getNextSettlementTime(name) {
        switch (name) {
            case "bh3":
                return this.getNextSettlementTime_BH3(name)

            case "genshin":
                return this.getNextSettlementTime_GENSHIN(name)

            default:
                return ("Unknown game name:" + name)
        }
    }

    getNextSettlementTime_BH3(name) {
        // let d = data["bh3"][name]
        const { time_util } = customJS

        let obj = [{
            "name": "记忆战场",
            "from":"崩坏三",
            "start_time": "2025-06-10T00:00:00",
            "finish_time": time_util.getFinishTime(this["start_time"], 42),
            "duration": "42天",
        }]

        return obj

    }

    getNextSettlementTime_GENSHIN(name) {
        // let d = data["genshin"][name]
    }
}