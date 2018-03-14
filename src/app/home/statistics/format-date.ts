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
}

export enum MONTHS {
    Ene = 1,
    Feb = 2,
    Mar = 3,
    Abr = 4,
    May = 5,
    Jun = 6,
    Jul = 7,
    Ago = 8,
    Sep = 9,
    Oct = 10,
    Nov = 11,
    Dic = 12
}

export enum GRAFIC {
    AREA_YEAR = 'areaYear',
    COLUNM_MONTHS = 'columMonth'
}

