// let dt = require("luxon").DateTime

let dt = dv.luxon.DateTime
let now = dt.now()

let name = input.name
let start_time = input.start_time
let finish_time = input.finish_time.minus({ seconds: 1 })
let diff_time

let show_text = ""

if (start_time < now && now < finish_time) {
    // 深渊开了
    diff_time = finish_time.diff(now, ["days", "hours", "minutes"])
    if (!now.hasSame(finish_time, "day")) {
        show_text = `距离 **${name}** 结算还有 *${finish_time.weekday - now.weekday}* 天`
            + `\n\n还不用着急`
    } else {
        show_text = `距离 **${name}** 结算还有`
            + ` *${diff_time.hours}* 小时 *${parseInt(diff_time.minutes + 1)}* 分`
            + `\n\n你使用了雄伟药水,你感觉到身体,啊啊啊啊啊...`
    }
} else {
    // 深渊没开
    diff_time = start_time.diff(now, ["days", "hours", "minutes"])
    if (!now.hasSame(start_time, "day")) {
        show_text = `**${name}** 还没开,下一期** ${name} **将会在* ${start_time.weekday - now.weekday} *天后开启`
            + `\n\n去看看其他的吧`
    } else {
        show_text = `**${name}** 还没开,下一期 **${name}** 将会在 `
            + `*${diff_time.hours}* 小时 *${parseInt(diff_time.minutes + 1)}* 分钟后开启`
            + `\n\n去看看其他的吧`
    }
}

dv.header(2, name)
// dv.span(diff_time)
dv.paragraph(show_text)
