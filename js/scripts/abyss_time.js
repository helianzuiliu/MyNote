// let dt = require("luxon").DateTime

const { GameTimeResolver, time_util } = customJS

const luxon = dv.luxon
const dt = luxon.DateTime
let now = dt.now()

let name = input.name
let start_time = input.start_time
let finish_time = input.finish_time

const page = dv.pages('"01.daily"').file
    .where(p => {
        const create_time = dt.fromString(p.name, "yyyy-MM-dd", { zone: "Asia/Shanghai" })
        // dv.span(start_time.toFormat("yyyy-MM-dd HH:mm:ss  ") )
        // dv.span(create_time.toFormat("yyyy-MM-dd HH:mm:ss  "))
        // dv.span(finish_time.toFormat("yyyy-MM-dd HH:mm:ss  "))
        // dv.paragraph(start_time <= create_time && create_time <= finish_time)
        return start_time <= create_time && create_time <= finish_time
    })

const tasks = page.tasks.where(t => {
    return t.text.includes(name)
})


let name_array = ["崩坏三", "原神", "崩坏：星穹铁道", "鸣嘲"]

let toStatus = (b) => {
    if (now < b.start_time) {
        return "未开始"
    } else if (now < b.finish_time) {
        return "进行中"
    } else {
        return "已结束"
    }
}

for (const name of name_array) {
    dv.header(2, name)
    let data = dv.array(GameTimeResolver.getNextSettlementTime(name, dt))
    dv.table([
        "名字",
        "状态",
        "开始时间",
        "结束时间",
        "剩余时间",
        "已完成"
    ],
        data.map(
            b => [
                b.name,
                toStatus(b),
                b.start_time.toFormat("yyyy-MM-dd HH:mm"),
                b.finish_time.toFormat("yyyy-MM-dd HH:mm"),
                b.status == "未开始" ? "" : b.remaining_time,
                now < b.finish_time ? "✅" : "❌"
            ]
        ))
    dv.paragraph(" ")
}
