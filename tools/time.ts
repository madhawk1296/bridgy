import moment from "moment"

export function hoursPer(timeframe: string) {
    if(timeframe == "daily") {
        return 24
    } else if (timeframe == "weekly") {
        return 24 * 7
    } else if (timeframe == "monthly") {
        return 24 * 30.436875
    } else {
        return 24 * 365.25
    }
} 

export function getTimestampFromBlock(value: number) {
    return new Date(value * 1000)
}

export function getDate(date: Date) {
    return moment(date).format('MMM Do, YYYY')
}