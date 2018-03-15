import { OnInit } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { Grafic, FormatDate } from './format-date';

declare let google: any;
let chart: any;
let totalsalesCash: number;
let totalsalesCard: number;
let controlDates: number;

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

    create(dateI, dateF) {
        this.cashierService.readAll(FormatDate.monthsTimeInit(dateI)).subscribe(
            data => {
                read(data);
            }
        );

        function read(data: any) {
            totalsalesCash = 0;
            totalsalesCard = 0;
            controlDates = 2;
            let monthInitial;
            let monthFinal;
            let salesList = [];
            data[controlDates]['closureDate'] = new Date();
            monthFinal = data[controlDates]['closureDate'].getMonth();

            for (let i = 1; i < data.length; i++) {
                data[i]['closureDate'] = new Date();
                monthInitial = data[i]['closureDate'].getMonth();
                if (monthInitial === monthFinal) {
                    totalsalesCard += data[i]['salesCard'];
                    totalsalesCash += data[i]['salesCash'];
                    salesList = ['' + monthInitial + '', totalsalesCard, totalsalesCash];
                    controlDates++;
                } else {
                    salesList.push(['' + monthFinal + '', data[i]['salesCard'], data[i]['salesCash']]);
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
