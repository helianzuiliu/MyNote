let dt = require("luxon").DateTime

let name = input.name
let start_time = dt.fromObject(input.start_time)
let finish_time = dt.fromObject(input.finish_time)

let now = dt.now()

if (start_time < now && now < finish_time) {
    // 深渊开了
    let diff_time = finish_time.diff(now, ["days", "hours", "minutes"]).toObject()
    if (diff_time.days != 0) {
        show_text = "距离深渊结算还有 **" + diff_time.days + "** 天,还不用着急"
    } else {
        show_text = "距离深渊结算还有** "
            + diff_time.hours + "** 小时 ** "
            + parseInt(diff_time.minutes + 1) + " ** 分,今天你打深渊了吗"
    }
} else {
    // 深渊没开
    let diff_time = start_time.diff(now, ["days", "hours", "minutes"]).toObject()
    if (diff_time.days != 0) {
        show_text = "深渊还没开,下一期深渊将会在 **" + diff_time.days + "** 天后开启"
    } else {
        show_text = "深渊还没开,下一期深渊将会在** "
            + diff_time.hours + "** 小时 ** "
            + parseInt(diff_time.minutes + 1) + " ** 分钟后开启"
    }
}
console.log("Current timestamp:", now);
// dv.span(arg1)