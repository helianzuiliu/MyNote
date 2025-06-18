
class time_util {


    /**
     * 获取当前周期的结束时间
     * @param {luxon.DateTime} stand_time 用于计算的基准时间,是现在之前的某个时间点
     * @param {number} duration 持续的时间
     * @returns 结束的时间
     */
    getFinishTime(stand_time, duration) {
        const now = new Date();
        const start = new Date(stand_time);

        // 验证输入是否为有效日期
        if (isNaN(start.getTime())) {
            throw new Error(`Invalid start date ${stand_time}`);
        }

        // 计算天数差（考虑闰秒等，使用毫秒计算）
        const msPerDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.floor((now - start) / msPerDay);

        // 计算当前周期序号（从1开始）
        const currentPeriod = Math.floor(diffDays / duration) + 1;

        // 计算当前周期的结束时间
        const periodEnd = new Date(start);
        periodEnd.setDate(periodEnd.getDate() + currentPeriod * duration);

        return periodEnd;
    }
}