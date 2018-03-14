export class FormatDate {

    static yearTimeInit(dateI: number): Date {
        let dateStart = new Date(dateI + "-01-01T00:00:00Z");
        return dateStart;
    }

    static yearTimeEnd(dateF: number): Date {
        let dateEnd = new Date(dateF + "-12-31T00:00:00Z");
        return dateEnd;
    }

    static monthsTimeInit(dateI: number): Date {
        let date = new Date();
        let year = date.getFullYear();
        let dateStart = new Date(year + "-" + dateI + "-01T00:00:00Z");
        return dateStart;
    }

    static monthsTimeEnd(dateF: number): Date {
        let date = new Date();
        let year = date.getFullYear();
        let dateEnd = new Date(year + "-" + dateF + "-31T00:00:00Z");

        return dateEnd;
    }

    static months = [
        { value: '01', viewValue: 'Ene' },
        { value: '02', viewValue: 'Feb' },
        { value: '03', viewValue: 'Mar' },
        { value: '04', viewValue: 'Abr' },
        { value: '05', viewValue: 'May' },
        { value: '06', viewValue: 'Jun' },
        { value: '07', viewValue: 'Jul' },
        { value: '08', viewValue: 'Ago' },
        { value: '09', viewValue: 'Sep' },
        { value: '10', viewValue: 'Oct' },
        { value: '11', viewValue: 'Nov' },
        { value: '12', viewValue: 'Dic' },
    ];

    static years(): object{
        let data = []
        for (let index = 2018; index < 2025; index++) {
            data.push(index);
        }
        return data;
    }
}

export enum GRAFIC {
    AREA_YEAR = 'areaYear',
    COLUNM_MONTHS = 'columMonth',
    AREA_MONTHS = 'areaCode'
}

