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

    getDaysOfMonth(time, dt) {
        // 获取当前月份的天数
        const now = dt.now();

        now.daysInMonth
        return new Date(year, month + 1, 0).getDate(); // 月份参数2表示三月，0表示二月最后一天
    }

    diffTime(start_time, finish_time, dt) {

    }

}