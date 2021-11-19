export default {
    getDay(day) {
        const today = new Date();
        let targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        let tYear = today.getFullYear();
        let tMonth = today.getMonth();
        let tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
    },
    doHandleMonth(month){
        let m = month
        if(month.toString().length == 1){
            m = "0"+month
        }
        return m
    }
}
