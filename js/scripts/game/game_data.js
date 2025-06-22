// let dt = require("luxon").DateTime
class GameTimeResolver {

    getNextSettlementTime(name, dt) {
        switch (name) {
            case "崩坏三":
                return this.getNextSettlementTime_BH3(name, dt)

            case "原神":
                return this.getNextSettlementTime_GENSHIN(name, dt)

            default:
                return ("Unknown game name:" + name)
        }
    }

    getNextSettlementTime_BH3(name, dt) {
        const { time_util } = customJS

        const now = dt.now()
        const base_time = now.set({ hour: 4, minute: 0, second: 0, millisecond: 0 })

        let obj = [{
            name: "超弦空间",
            start_time: base_time.set({ hour: 15, weekday: 1 }),
            finish_time: base_time.set({ hour: 22, weekday: 3 }),
        }, {
            name: "记忆战场",
            start_time: base_time.set({ weekday: 2 }),
            finish_time: base_time.set({ weekday: 1 }).plus({ weeks: 1 }),
        }]

        return obj.map(b => ({
            ...b,
            remaining_time: time_util.diffTime(now, b.finish_time),
            from: "崩坏三",
        }))

    }

    getNextSettlementTime_GENSHIN(name, dt) {
        // let d = data["genshin"][name]
        const { time_util } = customJS

        const now = dt.now()
        const base_time = now.set({ hour: 4, minute: 0, second: 0, millisecond: 0 })

        const firstDayThisMonth = base_time.set({ day: 1 })
        const middayThisMonth = base_time.set({ day: 16 })
        const lastDayThisMonth = base_time.set({ day: base_time.daysInMonth })
        const middayNextMonth = base_time.set({ day: 16 }).plus({ months: 1 })

        let obj = [{
            name: "马斯克礁",
            start_time: firstDayThisMonth,
            finish_time: lastDayThisMonth,
        }, {
            name: "幻想真镜剧诗",
            start_time: middayThisMonth,
            finish_time: middayNextMonth,
        }]

        return obj.map(b => ({
            ...b,
            // 剩余时间
            remaining_time: time_util.diffTime(now, b.finish_time),
            from: "原神",
        }))

    }
}