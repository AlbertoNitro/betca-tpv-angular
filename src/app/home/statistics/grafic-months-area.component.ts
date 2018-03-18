import { OnInit } from '@angular/core';
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { Grafic, FormatDate } from './format-date';

declare let google: any;
let chart: any;

export class GraficMonthsAreaComponent {

    constructor(private cashierService: TicketService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            const data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.AREA_MONTHS));
            chart.draw(data);
        }
    }

    create(code: string) {
        // this.readData(code);
        google.charts.setOnLoadCallback(draw);

        function draw() {
            const dataAPI = google.visualization.arrayToDataTable([
                ['closureDate', 'salesCard'],
                ['2018', 1]
            ]);
            const options = {
                hAxis: { title: 'Meses', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Ventas', minValue: 0 }
            };
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.AREA_MONTHS));
            chart.draw(dataAPI, options);
        }
    }
}
