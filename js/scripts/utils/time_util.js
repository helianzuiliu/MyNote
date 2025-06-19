// let dt=require('luxon').DateTime
class time_util {

    // 获取特定月份的天数
    getDaysOfMonth(time) {
        // 获取当前月份的天数
        const t = new Date(time);
        const year = t.getFullYear();
        const month = t.getMonth(); // 0-11
        return new Date(year, month + 1, 0).getDate(); // 月份参数2表示三月，0表示二月最后一天
    }

    getDaysOfMonth(time,dt) {
        // 获取当前月份的天数
        const now = dt.now();
        
        dt.fromObject(time,)
        return new Date(year, month + 1, 0).getDate(); // 月份参数2表示三月，0表示二月最后一天
    }


}