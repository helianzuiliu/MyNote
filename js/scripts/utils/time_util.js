class time_util{
    getDiffTime(startTime, endTime) {
        let diff = endTime - startTime;

        if (diff < 0) {
            return "Invalid time range";
        }

        let hours = Math.floor(diff / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
    }
    
    getCurrentTime() {
        return new Date().toLocaleString("zh-CN", {
            timeZone: "Asia/Shanghai"
        });
    }
}