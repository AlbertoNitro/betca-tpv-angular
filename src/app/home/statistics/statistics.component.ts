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
        google.charts.setOnLoadCallback(draw);
        function draw() {

            var data = google.visualization.arrayToDataTable([
                ['--', 'Ventas'],
                ['0', 0],
            ]);

            var chart_anual = new google.visualization.AreaChart(document.getElementById('chart_anual'));
            chart_anual.draw(data);
            var chart_mes = new google.visualization.ColumnChart(document.getElementById('chart_mes'));
            chart_mes.draw(data);
            var chart_prodmes = new google.visualization.AreaChart(document.getElementById('chart_prodmes'));
            chart_prodmes.draw(data);
        }
    }

    createVentaAnual(): void {
        google.charts.setOnLoadCallback(drawVentaAnual);
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
    }

    createVentaMes(): void {
        google.charts.setOnLoadCallback(drawVentaMes);
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
    }

    createProdxMes(): void {
        google.charts.setOnLoadCallback(drawProdxMes);
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