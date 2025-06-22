// let dt=require('luxon').DateTime
class time_util {

    /**
     * 获取下个月的第一天
     * @param {*} time ISO时间字符串，获取指定时间的下个月第一天
     * @param {*} dt 
     * @returns 
     */
    getFirstDateInNextMonth(time, dt) {
        // 获取当前月份的天数
        const t = dt.fromISO(time);
        // t.set({ day: 1 })
        t.plus({ months: 1 });

        return t;
    }

    diffTime(start_time, finish_time) {
        let duration = finish_time.diff(start_time, ["days", "hours", "minutes"])
        if (duration.get("days") == 0) {
            return `${duration.get("hours")}小时${parseInt(duration.get("minutes"))}分钟`
        }
        return `${duration.get("days")}天`
    }
}