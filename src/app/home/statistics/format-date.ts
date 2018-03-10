import { NativeDateAdapter } from '@angular/material';

export class AppDateAdapter extends NativeDateAdapter {

    format(date: Date): string {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return year + '/' + this._to2digit(month) + '/' + this._to2digit(day);
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}

export const APP_DATE_FORMATS =
    {
        parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
        display: { dateInput: 'input' }
    }