// let dt = require("luxon").DateTime

const { GameTimeResolver, time_util } = customJS

const luxon = dv.luxon
const dt = luxon.DateTime
let now = dt.now()

let name = input.name
let start_time = input.start_time
let finish_time = input.finish_time

let show_text = "123"
// dv.span(a)
// dv.span(GameTimeResolver.getNextSettlementTime(luxon, "bh3"))

dv.header(2, name)
dv.paragraph(show_text)

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


// 查询是否有任务,如果没有就用模板创建一个
if (tasks.length == 0) {
    dv.paragraph("没有目标任务，点击下方按钮添加目标任务")


    const quickAddApi = app.plugins.plugins.quickadd.api;



    // 创建的任务示例  - [ ] #task #Game 记忆战场 ➕ 2025-06-11 🛫 2025-06-10 📅 2025-06-15 ✅ 2025-06-11
    // dv.button("添加目标任务", "add_task.md", {icon: "plus", size: "small"})
} else {
    dv.taskList(tasks, false)

    if (!tasks[0].completed) {
        dv.paragraph("目标任务未完成，记得完成哦！")
    } else {
        dv.paragraph("目标任务已完成，可以摸鱼了")
    }
}

let name_array = ["崩坏三", "原神"]

for (let name of name_array) {
    dv.header(2, name)
    let data = dv.array(GameTimeResolver.getNextSettlementTime(name, dt))
    dv.table(["名字", "状态", "开始时间", "结束时间", "剩余时间", "已完成"],
        data.map(
            b => [
                b.name,
                (((b) => {
                    if (now < b.start_time) {
                        return b.start_time
                    } else if (now < b.finish_time) {
                        return b.finish_time
                    } else {
                        return b.finish_time
                    }
                })(b)),
                b.start_time.toFormat('yyyy-MM-dd HH:mm:ss'),
                b.finish_time.toFormat('yyyy-MM-dd HH:mm:ss'),
                b.status == "未开始" ? "" : b.remaining_time,
                b.finish_time < now ? "✅" : "❌"
            ]
        ))
}
