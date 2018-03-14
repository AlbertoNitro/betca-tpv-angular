import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material'
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { GRAFIC, FormatDate } from './format-date';

declare let google: any;
let chart: any;
let dateStart: any;
let dateEnd: any;

export class GraficYearAreaComponent {

    dataSource: MatTableDataSource<CashierClosure>;

    constructor(private cashierService: CashierService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            let data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.AreaChart(document.getElementById(GRAFIC.AREA_YEAR));
            chart.draw(data);
        }
    }

    create(dateI, dateF) {
        this.readData(dateI, dateF);
        google.charts.setOnLoadCallback(draw);

        function draw() {
            let dataAPI = google.visualization.arrayToDataTable([
                ['closureDate', 'salesCard', 'salesCash'],
                ['2018', 1, 11]
            ]);
            let options = {
                hAxis: { title: 'Años', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Ventas', minValue: 0 }
            };
            chart = new google.visualization.AreaChart(document.getElementById(GRAFIC.AREA_YEAR));
            chart.draw(dataAPI, options);
        }
    }

    readData(dateI, dateF) {
        dateStart = FormatDate.yearTimeInit(dateI);
        dateEnd = FormatDate.yearTimeEnd(dateF);
        this.cashierService.readAll(dateStart).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<CashierClosure>(data);
                console.log(this.dataSource.data);
            }
        );
    }
}