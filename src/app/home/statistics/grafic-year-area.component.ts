import { OnInit } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { Grafic, FormatDate } from './format-date';

declare let google: any;
let chart: any;
let totalsalesCash: number;
let totalsalesCard: number;
let controlDates: number;
export class GraficYearAreaComponent {

    constructor(private cashierService: CashierService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            const data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.AreaChart(document.getElementById(Grafic.AREA_YEAR));
            chart.draw(data);
        }
    }

    create(dateI, dateF) {
        this.cashierService.readAll(FormatDate.yearTimeInit(dateI)).subscribe(
            data => {
                read(data);
            }
        );

        function read(data: any) {
            totalsalesCash = 0;
            totalsalesCard = 0;
            controlDates = 2;
            let yearInitial;
            let yearFinal;
            let salesList = [];
            data[controlDates]['closureDate'] = new Date();
            yearFinal = data[controlDates]['closureDate'].getFullYear();

            for (let i = 1; i < data.length; i++) {
                data[i]['closureDate'] = new Date();
                yearInitial = data[i]['closureDate'].getFullYear();
                if (yearInitial === yearFinal) {
                    totalsalesCard += data[i]['salesCard'];
                    totalsalesCash += data[i]['salesCash'];
                    salesList = ['' + yearInitial + '', totalsalesCard, totalsalesCash];
                    controlDates++;
                } else {
                    salesList.push(['' + yearFinal + '', data[i]['salesCard'], data[i]['salesCash']]);
                }
            }
            google.charts.setOnLoadCallback(draw(salesList));
        }

        function draw(salesList) {
            const dataAPI = google.visualization.arrayToDataTable([
                ['Date', 'Sales Card', 'Sales Cash'], salesList]);
            const options = {
                hAxis: { title: 'Años', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Ventas', minValue: 0 }
            };
            chart = new google.visualization.AreaChart(document.getElementById(Grafic.AREA_YEAR));
            chart.draw(dataAPI, options);
        }
    }
}
