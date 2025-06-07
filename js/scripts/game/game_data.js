// let dt = require("luxon").DateTime
class GameTimeResolver {

    getNextSettlementTime(dv, name) {
        dv.span("正在获取下次结算时间...")
        switch (name) {
            case "bh3":
                return this.getNextSettlementTime_BH3(name)

            case "genshin":
                return this.getNextSettlementTime_GENSHIN(name)

            default:
                return ("Unknown game name:" + name)
        }
    }

    getNextSettlementTime_BH3(dv, name) {
        // let d = data["bh3"][name]
        let now = new Date()
        return now.toLocaleString("zh-CN", {
            timeZone: "Asia/Shanghai"
        })
    }

    getNextSettlementTime_GENSHIN(dv, name) {
        // let d = data["genshin"][name]
    }
}