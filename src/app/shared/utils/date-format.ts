export class DateFormat {
    static readonly timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    public static getLocaleDateFormatString = (date?: string): string => {
        const dateFormated = date ? new Date(`${date}T00:00:00Z`) : new Date();
        return dateFormated.toLocaleString('en-US', { timeZone: DateFormat.timeZone });
    }
}
