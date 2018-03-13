import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MatSort } from '@angular/material'
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
declare var google: any;

@Component({
    templateUrl: `statistics.component.html`,
    styleUrls: [`statistics.component.css`],
})
export class StatisticsComponent implements OnInit {
    static URL = 'statistics';
    dataSource: MatTableDataSource<CashierClosure>;
    private dateStart: Date;
    private dateEnd: Date;

    years = ['2018', '2019', '2020'];
    mount = [
        {value: '01', viewValue: 'Ene'},
        {value: '02', viewValue: 'Feb'},
        {value: '03', viewValue: 'Mar'},
        {value: '04', viewValue: 'Abr'},
        {value: '05', viewValue: 'May'},
        {value: '06', viewValue: 'Jun'},
        {value: '07', viewValue: 'Jul'},
        {value: '08', viewValue: 'Ago'},
        {value: '09', viewValue: 'Sep'},
        {value: '10', viewValue: 'Oct'},
        {value: '11', viewValue: 'Nov'},
        {value: '12', viewValue: 'Dic'},
      ]
    constructor(private cashierService: CashierService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }

    ngOnInit(): void {

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

        google.charts.setOnLoadCallback(draw);




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