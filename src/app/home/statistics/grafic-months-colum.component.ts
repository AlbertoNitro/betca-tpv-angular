import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material'
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { Grafic, FormatDate } from './format-date';

declare let google: any;
let chart: any;
let dateStart: any;
let dateEnd: any;

export class GraficMonthsColumnComponent {

    dataSource: MatTableDataSource<CashierClosure>;

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
        this.readData(dateI, dateF);
        google.charts.setOnLoadCallback(draw);

        function draw() {
            const dataAPI = google.visualization.arrayToDataTable([
                ['closureDate', 'salesCard', 'salesCash'],
                ['2018', 1, 11]
            ]);
            const options = {
                hAxis: { title: 'Meses', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Ventas', minValue: 0 }
            };
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.COLUNM_MONTHS));
            chart.draw(dataAPI, options);
        }
    }

    readData(dateI, dateF) {
        dateStart = FormatDate.monthsTimeInit(dateI);
        dateEnd = FormatDate.monthsTimeEnd(dateF);
        this.cashierService.readAll(dateStart).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<CashierClosure>(data);
                console.log(this.dataSource.data);
            }
        );
    }
}
