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
            name: "马斯克礁",
            stand_time: "2025-02-01T04:00:00",
            duration: 1,
            a: stand_time
        }]

        return obj.map(b => ({
            ...b,
            from: "原神",
            // 补充开始时间和结束时间
            ...(() => {
                // 获取当前月份的天数
                const t = new Date("2025-02-01T04:00:00");
                t.setMonth(new Date().getMonth()); // 设置为当前月份
                const year = t.getFullYear();
                const month = t.getMonth(); // 0-11

                return {
                    start_time: new Date(year, month, 1).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
                    finish_time: new Date(year, month + 1, 0).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
                }
            })(),
        }))

    }
}