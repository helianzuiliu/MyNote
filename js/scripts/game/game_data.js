// let dt = require("luxon").DateTime
class GameTimeResolver {

    getNextSettlementTime(name,dt) {
        switch (name) {
            case "bh3":
                return this.getNextSettlementTime_BH3(name, dt)

            case "genshin":
                return this.getNextSettlementTime_GENSHIN(name, dt)

            default:
                return ("Unknown game name:" + name)
        }
    }

    getNextSettlementTime_BH3(name, dt) {
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

    getNextSettlementTime_GENSHIN(name, dt) {
        // let d = data["genshin"][name]
        const { time_util } = customJS

        let now = new Date()

        let obj = [{
            name: "马斯克礁",
            start_time: new Date(now.getFullYear(), now.getMonth(), 1, 4, 0, 0),
            finish_time: new Date(now.getFullYear(), now.getMonth() + 1, 0, 4, 0, 0),
        }]

        return obj.map(b => ({
            ...b,
            start_time: b.start_time.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
            finish_time: b.finish_time.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
            // 剩余时间
            remaining_time: time_util.diffTime(b.start_time, b.finish_time, dt),
            from: "原神",
        }))

    }
}