
class time_util {

    // 获取特定月份的天数
    getDaysOfMonth(time) {
        // 获取当前月份的天数
        const t = new Date(time);
        const year = t.getFullYear();
        const month = t.getMonth(); // 0-11
        return new Date(year, month + 1, 0).getDate(); // 月份参数2表示三月，0表示二月最后一天
    }

    /**
     * 获取当前周期的开始时间和结束时间
     * @param {luxon.DateTime} stand_time_ 用于计算的基准时间,是现在之前的某个时间点
     * @param {number} duration_ 持续的时间
     * @returns 结束的时间
     */
    getPeriodTime(stand_time_, duration_) {
        const now = new Date();
        const stand_time = new Date(stand_time_);

        // 验证输入是否为有效日期
        if (isNaN(stand_time.getTime())) {
            throw new Error(`Invalid start date ${stand_time}`);
        }

        // 计算天数差（考虑闰秒等，使用毫秒计算）
        const msPerDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.floor((now - stand_time) / msPerDay);

        // 计算当前周期序号（从1开始）
        const currentPeriod = Math.floor(diffDays / duration_);

        // 计算当前周期的结束时间
        const start_time = new Date(stand_time);
        const finish_time = new Date(stand_time);
        start_time.setDate(start_time.getDate() + currentPeriod * duration_);
        finish_time.setDate(finish_time.getDate() + (currentPeriod + 1) * duration_);

        return {
            start_time: start_time.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
            finish_time: finish_time.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
        };
    }


}