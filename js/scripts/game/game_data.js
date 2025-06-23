// let dt = require("luxon").DateTime
class GameTimeResolver {

    getNextSettlementTime(name, dt) {
        switch (name) {
            case "崩坏三":
                return this.getNextSettlementTime_BH3(name, dt)
            case "原神":
                return this.getNextSettlementTime_GENSHIN(name, dt)
            case "崩坏：星穹铁道":
                return this.getNextSettlementTime_BHSR(name, dt)
            case "鸣嘲":
                return this.getNextSettlementTime_MINGCHAO(name, dt)
            default:
                return ("Unknown game name:" + name)
        }
    }

    getNextSettlementTime_BH3(name, dt) {
        const { time_util } = customJS

        const now = dt.now()
        const base_time = now.set({ hour: 4, minute: 0, second: 0, millisecond: 0 })

        let start_time_1 = base_time.set({ weekday: 1, hour: 15 })
        let finish_time_1 = base_time.set({ weekday: 3, hour: 22 })
        let start_time_2 = base_time.set({ weekday: 5, hour: 15 })
        let finish_time_2 = base_time.set({ weekday: 7, hour: 22 })

        let a = finish_time_1 < now && now < finish_time_2 ? {
            start_time: start_time_2,
            finish_time: finish_time_2,
        } : {
            start_time: start_time_1,
            finish_time: finish_time_1,
        }

        let obj = [{
            name: "超弦空间",
            ...a
        }, {
            name: "记忆战场",
            start_time: base_time.set({ weekday: 2 }),
            finish_time: base_time.set({ weekday: 1 }).plus({ weeks: 1 }),
        }, {
            name: "往世乐土",
            start_time: base_time.set({ weekday: 1 }),
            finish_time: base_time.set({ weekday: 1 }).plus({ weeks: 1 }),
        }]

        return obj.map(b => ({
            ...b,
            remaining_time: time_util.diffTime(now, b.finish_time),
            from: name,
        }))

    }

    getNextSettlementTime_GENSHIN(name, dt) {
        const { time_util } = customJS

        const now = dt.now()
        const base_time = now.set({ hour: 4, minute: 0, second: 0, millisecond: 0 })

        let obj = [{
            name: "马斯克礁",
            start_time: base_time.set({ day: 1 }),
            finish_time: base_time.set({ day: base_time.daysInMonth }),
        }, {
            name: "幻想真镜剧诗",
            start_time: base_time.set({ day: 16 }),
            finish_time: base_time.set({ day: 16 }).plus({ months: 1 }),
        }]

        return obj.map(b => ({
            ...b,
            remaining_time: time_util.diffTime(now, b.finish_time),
            from: name,
        }))
    }

    getNextSettlementTime_BHSR(name, dt) {
        const { time_util } = customJS

        const now = dt.now()
        const base_time = now.set({ hour: 4, minute: 0, second: 0, millisecond: 0 })
        let obj = [{
            name: "忘却之庭",
            ...time_util.getPeriodTime(stand_time,42),
        }]


        return obj.map(b => ({
            ...b,
            remaining_time: time_util.diffTime(now, b.finish_time),
            from: name,
        }))
    }

    getNextSettlementTime_MINGCHAO(name, dt) {
        const { time_util } = customJS

        const now = dt.now()
        const base_time = now.set({ hour: 4, minute: 0, second: 0, millisecond: 0 })
        let obj = []

        return obj.map(b => ({
            ...b,
            remaining_time: time_util.diffTime(now, b.finish_time),
            from: name,
        }))
    }
}