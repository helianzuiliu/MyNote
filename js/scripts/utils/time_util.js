// let dt=require('luxon').DateTime
class time_util {

    diffTime(start_time, finish_time) {
        let duration = finish_time.diff(start_time, ["days", "hours", "minutes"])
        if (duration.get("days") == 0) {
            return `${duration.get("hours")}小时${parseInt(duration.get("minutes"))}分钟`
        }
        return `${duration.get("days")}天`
    }
}