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
            "start_time": "2025-06-10T00:00:00",
            "duration": 6,
        }]

        return obj.map(b => ({
            ...b,
            from: "崩坏三",
            finish_time: time_util.getFinishTime(b.start_time, b.duration).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
        }))

    }

    getNextSettlementTime_GENSHIN(name) {
        // let d = data["genshin"][name]
        const { time_util } = customJS

        let obj = [{
            "name": "马斯克礁",
            "start_time": "2025-06-01T04:00:00",
            "duration": 30,
        }]

        return obj.map(b => ({
            ...b,
            from: "原神",
            finish_time: time_util.getFinishTime(b.start_time, b.duration).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
        }))

    }
}