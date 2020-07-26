const dateTo4DigitTime = value =>
    value.getHours() * 100 + value.getMinutes();
const timeIsValid = value =>
    value && !isNaN(value)
    && 0 <= parseInt(value)
    && parseInt(value) <= 2359
    && parseInt(value.slice(-2)) < 60;

export default class Timestamp {
    /**
     * @param {Date} timestamp 
     */
    constructor(timestamp) {
        if (timestamp instanceof Date) {
            this.date = new Date(
                timestamp.getFullYear(),
                timestamp.getMonth(),
                timestamp.getDate());
            this.time = dateTo4DigitTime(timestamp);
            this.sorttime = this.time;
            this.isMidEntry = false;
        }
        else {
            this.date = timestamp.date;
            this.time = timestamp.time;
            this.sorttime = timestamp.sorttime;
            this.setIsMidEntry(false);
        }
    }

    toObject = () => {
        return {
            date: this.date,
            time: this.time,
            sorttime: this.sorttime
        };
    }

    startEntry = () => this.setIsMidEntry(true);
    completeEntry = () => this.setIsMidEntry(false);

    renderTime = () => this.isMidEntry
        ? this.time.toString()
        : this.time.toString().padStart(4, "0");

    setIsMidEntry(value) {
        this.isMidEntry = value;
        if (!value) {
            if (timeIsValid(this.time.toString())) {
                this.sorttime = this.time;
            } else {
                this.time = this.sorttime;
            }
        }
        return this;
    }

    setTime(value) {
        if (!value) {
            value = 0;
        }
        if (!isNaN(value)) {
            this.time = parseInt(value);
        }
        return this;
    }
}
