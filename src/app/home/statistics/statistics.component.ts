import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MatSort } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-date';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
declare var google: any;

@Component({
    templateUrl: `statistics.component.html`,
    styleUrls: [`statistics.component.css`],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class StatisticsComponent implements OnInit {
    static URL = 'statistics';

    dataSource: MatTableDataSource<CashierClosure>;
    constructor(private dateAdapter: DateAdapter<Date>, private cashierService: CashierService) {
        dateAdapter.setLocale('es-ES'); // Format Spanish
    }

    ngOnInit(): void {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(draw);

        function draw() {

            var data = google.visualization.arrayToDataTable([
                ['', ''],
                ['', 0]
            ]);
            var chart = new google.visualization.AreaChart(document.getElementById('chart_areA'));
            chart.draw(data);
            var chart = new google.visualization.ColumnChart(document.getElementById('chart_col'));
            chart.draw(data);
            var chart = new google.visualization.AreaChart(document.getElementById('chart_areM'));
            chart.draw(data);
        }
    }



    create(code: string, dpInicio: string, dpFin: string, titleh: string, titlev: string, estado: string) {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(draw);

        var fechaI = 'ISODate("' + dpInicio + 'T00:00:00.000Z)"';
        var fechaF = 'ISODate("' + dpFin + 'T99:99:99.999Z)"';

        this.cashierService.readObservable(fechaI, fechaF).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<CashierClosure>(data);
            }
        );

        function draw() {

            var dataAPI = google.visualization.arrayToDataTable([
                ['', '----'],
                ['prueba', 2000]
            ]);

            if (estado === 'areaA') {
                var options = {
                    hAxis: { title: titleh, titleTextStyle: { color: '#333' } },
                    vAxis: { title: titlev, minValue: 0 }
                };
                var chart = new google.visualization.AreaChart(document.getElementById('chart_areA'));
                chart.draw(dataAPI, options);
            } else if (estado === 'columna') {
                var options = {
                    hAxis: { title: titleh, titleTextStyle: { color: '#333' } },
                    vAxis: { title: titlev, minValue: 0 }
                };
                var chart = new google.visualization.ColumnChart(document.getElementById('chart_col'));
                chart.draw(dataAPI, options);
            } else if (estado === 'areaM') {
                var options = {
                    hAxis: { title: titleh, titleTextStyle: { color: '#333' } },
                    vAxis: { title: titlev, minValue: 0 }
                };
                var chart = new google.visualization.AreaChart(document.getElementById('chart_areM'));
                chart.draw(dataAPI, options);
            }
        }
    }
}