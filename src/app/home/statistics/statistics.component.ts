import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
declare var google: any;

@Component({
    templateUrl: `statistics.component.html`,
    styleUrls: [`statistics.component.css`]
})
export class StatisticsComponent implements OnInit {
    static URL = 'statistics';

    ngOnInit(): void {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawVentaAnual);
        google.charts.setOnLoadCallback(drawVentaMes);
        google.charts.setOnLoadCallback(drawProdxMes);

        function drawVentaAnual() {

            var data = google.visualization.arrayToDataTable([
                ['Anio', 'Ventas'],
                ['2015', 18000],
                ['2016', 1000],
                ['2017', 100],
                ['2018', 1100]
            ]);

            var optionsAnual = {
                hAxis: { title: 'Años', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Ventas', minValue: 0 }
            };


            var chart = new google.visualization.AreaChart(document.getElementById('chart_anual'));
            chart.draw(data, optionsAnual);
        }



        function drawVentaMes() {

            var data = google.visualization.arrayToDataTable([
                    ['Mes', 'Ventas'],
                    ['Enero',  1000],
                    ['Febreo',  1170],
                    ['Marzo',  660]
                  ]);

            var optionsMes = {
                hAxis: { title: 'Meses' },
                vAxis: {title: 'Ventas'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_mes'));

            chart.draw(data, optionsMes);
        }



        function drawProdxMes() {

            var data = google.visualization.arrayToDataTable([
                ['Anio', 'Ventas'],
                ['2017', 11000],
                ['2018', 1100]
            ]);

            var options = {
                hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Total', minValue: 0 }
            };


            var chart = new google.visualization.AreaChart(document.getElementById('chart_prodmes'));
            chart.draw(data, options);
        }
    }
}