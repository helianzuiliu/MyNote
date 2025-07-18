// let dt=require('luxon').DateTime
class time_util {

    /**
     * 
     * @param {*} duration 
     * @returns 
     */
    durationToString(duration) {
        if (duration.get("days") == 0) {
            return `${duration.get("hours")}小时${parseInt(duration.get("minutes"))}分钟`
        }
        return `${duration.get("days")}天`
    }

    /**
     * 计算周期时间
     * @param {*} stand_time 
     * @param {*} duration 
     */
    getPeriodTime(stand_time, duration) {
        let diffDays = - stand_time.diffNow("days").as("days") // 负号很重要
        let period = parseInt(diffDays / duration)

        return {
            start_time: stand_time.plus({ days: period * duration }),
            finish_time: stand_time.plus({ days: (period + 1) * duration }),
        }
    }
}