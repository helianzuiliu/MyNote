// let dt=require('luxon').DateTime
class time_util {

    /**
     * 获取下个月的第一天
     * @param {*} time ISO时间字符串，获取指定时间的下个月第一天
     * @param {*} dt 
     * @returns 
     */
    getFirstDateNextMonth(time, dt) {
        // 获取当前月份的天数
        const t = dt.fromISO(time);
        t.plus({ months: 1 });
        t.setDay(1); // 设置为下个月的第一天
        return new Date(year, month + 1, 0).getDate(); // 月份参数2表示三月，0表示二月最后一天
    }

    /**
     * 获取当前时间的下个月第一天
     * @param {*} dt 
     */
    getFirstDateNextMonth(dt) {
        this.getFirstDateNextMonth(dt.local(), dt);
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