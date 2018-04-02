export class FormatDate {

    static yearTimeStart(dateI: number): Date {
        const dateStart = new Date(Date.UTC(dateI, 0, 1, 0, 0, 0));
        return dateStart;
    }

    static yearTimeFinish(dateF: number): Date {
        const dateEnd = new Date(Date.UTC(dateF, 11, 31, 24, 0, 0));
        return dateEnd;
    }

    static monthsTimeStart(dateI: number): Date {
        const date = new Date();
        const yearInitial = date.getFullYear();
        const dateStart = new Date(Date.UTC(yearInitial, dateI, 1, 0, 0, 0));
        return dateStart;
    }

    static monthsTimeFinish(dateF: number): Date {
        const date = new Date();
        const yearFinish = date.getFullYear();
        const dateEnd = new Date(Date.UTC(yearFinish, dateF, 31, 24, 0, 0));
        return dateEnd;
    }

    // tslint:disable-next-line:member-ordering
    static months = [
        { value: '0', viewValue: 'Ene' },
        { value: '1', viewValue: 'Feb' },
        { value: '2', viewValue: 'Mar' },
        { value: '3', viewValue: 'Abr' },
        { value: '4', viewValue: 'May' },
        { value: '5', viewValue: 'Jun' },
        { value: '6', viewValue: 'Jul' },
        { value: '7', viewValue: 'Ago' },
        { value: '8', viewValue: 'Sep' },
        { value: '9', viewValue: 'Oct' },
        { value: '10', viewValue: 'Nov' },
        { value: '11', viewValue: 'Dic' },
    ];

    static years(): object {
        const data = [];
        for (let index = 2018; index < 2025; index++) {
            data.push(index);
        }
        return data;
    }
}

export enum Grafic {
    AREA_YEAR = 'areaYear',
    COLUNM_MONTHS = 'columMonth',
    AREA_MONTHS = 'areaCode'
}

