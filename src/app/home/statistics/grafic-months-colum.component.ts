import { OnInit } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { Grafic, FormatDate } from './format-date';

declare let google: any;
let chart: any;
let totalsalesCash: number;
let totalsalesCard: number;
let controlDates: number;
const month = FormatDate.months;
export class GraficMonthsColumnComponent {

    constructor(private cashierService: CashierService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            const data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.COLUNM_MONTHS));
            chart.draw(data);
        }
    }

    create(monthInitial, monthFinal) {
        this.cashierService.readAll(FormatDate.monthsTimeInit(monthInitial)).subscribe(
            data => {
                read(data);
            }
        );

        function read(data: any) {
            totalsalesCash = 0;
            totalsalesCard = 0;
            controlDates = 1;
            let dateInitial;
            let dateFinal;
            let salesList = [];
            data[controlDates]['closureDate'] = new Date();
            dateFinal = data[controlDates]['closureDate'].getMonth();

            for (let i = 0; i < data.length; i++) {
                data[i]['closureDate'] = new Date();
                dateInitial = data[i]['closureDate'].getMonth();
                if (dateInitial === dateFinal) {
                    totalsalesCard += data[i]['salesCard'];
                    totalsalesCash += data[i]['salesCash'];
                    salesList = ['' + month[dateInitial].viewValue + '', totalsalesCard, totalsalesCash];
                    controlDates++;
                } else {
                    salesList.push(['' + month[dateFinal].viewValue + '', data[i]['salesCard'], data[i]['salesCash']]);
                }
            }
            google.charts.setOnLoadCallback(draw(salesList));
        }

        function draw(salesList) {
            const dataAPI = google.visualization.arrayToDataTable([
                ['Date', 'Sales Card', 'Sales Cash'], salesList]);
            const options = {
                hAxis: { title: 'Meses', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Ventas', minValue: 0 }
            };
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.COLUNM_MONTHS));
            chart.draw(dataAPI, options);
        }
    }
}
